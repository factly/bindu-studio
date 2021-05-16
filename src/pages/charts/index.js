import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Display from './display.js';
import ChartOption from './options.js';
import { saveAs } from 'file-saver';
import './index.css';
import _ from 'lodash';

import {
  Card,
  Tooltip,
  Button,
  Input,
  Form,
  Modal,
  Dropdown,
  Menu,
  Popover,
  Typography,
} from 'antd';
import {
  SaveOutlined,
  SettingOutlined,
  EditOutlined,
  UploadOutlined,
  MenuOutlined,
  DatabaseOutlined,
  AreaChartOutlined,
} from '@ant-design/icons';

import DataViewer from './data_viewer.js';
import UppyUploader from '../../components/uppy';
import { b64toBlob } from '../../utils/file';
import { useParams } from 'react-router';
import { collapseSider } from '../../actions/settings.js';
import updateFormData from '../../utils/updateFormData.js';

const IconSize = 20;

const TitleComponent = ({ chartName, setChartName }) => {
  const [isChartNameEditable, setChartNameEditable] = useState(false);

  if (isChartNameEditable) {
    return (
      <div className="chart-name-editable-container">
        <Input
          onPressEnter={() => setChartNameEditable(false)}
          value={chartName}
          onChange={(e) => setChartName(e.target.value)}
        />{' '}
        <Button
          style={{ padding: '4px 0px' }}
          size="medium"
          onClick={() => setChartNameEditable(false)}
          type="primary"
        >
          Save
        </Button>{' '}
      </div>
    );
  } else {
    return (
      <div className="chart-name-container">
        <label className="chart-name">{chartName}</label>
        <EditOutlined style={{ fontSize: IconSize }} onClick={() => setChartNameEditable(true)} />
      </div>
    );
  }
};

function Chart({ data = {}, onSubmit }) {
  const dispatch = useDispatch();
  const { templateId } = useParams();
  const [form] = Form.useForm();

  const [showModal, setShowModal] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [chartName, setChartName] = useState('Untitled');
  const [view, setView] = useState(null);
  const [isDataView, setDataView] = useState(false);
  const [values, setValues] = useState([]);
  const [columns, setColumns] = useState([]);
  const space_slug = useSelector((state) => state.spaces.details[state.spaces.selected]?.slug);
  const template = useSelector(({ templates }) => templates.details[templateId]);
  const dataViewContainer = React.useRef(null);
  const displayRef = React.useRef(null);
  const containerRef = React.useRef(null);

  const onDataUpload = (dataDetails) => {
    let values = form.getFieldValue();

    // Keep only one of values and url. If url exists, then remove values.
    _.unset(values, ['data', 'values']);
    _.set(values, ['data', 'url'], dataDetails.url.raw);
    form.setFieldsValue(values);
    fetch(dataDetails.url.raw)
      .then((res) => res.json())
      .then((newValues) => {
        const newColumns = Object.keys(newValues[0]).map((d) => {
          return {
            title: d,
            dataIndex: d,
          };
        });

        setColumns(newColumns);
        setValues(newValues);
      });
  };

  React.useEffect(() => {
    dispatch(collapseSider());
  }, [template]);

  React.useEffect(() => {
    if (data && data.id) {
      form.setFieldsValue({
        ...data.config,
        categories: data.categories.map((category) => category.id),
        tags: data.tags.map((tag) => tag.id),
      });
      setChartName(data.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const downloadSampleData = () => {
    const url = form.getFieldValue(['data', 'url']);
    const values = form.getFieldValue(['data', 'values']);
    if (url) {
      saveAs(url, url.split('/').pop());
    } else if (values) {
      const blob = new Blob([JSON.stringify(values)], { type: 'application/json;charset=utf-8' });
      saveAs(blob, 'sample.json');
    }
  };

  const downloadImage = async (e) => {
    const ext = e.key;
    const data = await view?.toImageURL(ext, 1);
    let blob;
    if (ext === 'svg') {
      blob = data;
    } else {
      blob = b64toBlob(data.split(',')[1], 'image/' + ext);
    }
    saveAs(blob, `${chartName}.${ext}`);
  };

  const saveChart = async (e) => {
    // If spec contains values, remove it and push it to minio. Then, set url of that file in spec
    const formData = form.getFieldValue();
    let url = formData.data.url;
    const path =
      space_slug +
      '/' +
      new Date().getFullYear() +
      '/' +
      new Date().getMonth() +
      '/' +
      Date.now().toString() +
      '_';

    if (formData.data.values) {
      // make a json file out of values
      if (formData.data.url) {
        // replace file in minio at location `data.url`

        url = await updateFormData(
          formData,
          formData.data.url.includes('http://localhost:9000/dega/')
            ? formData.data.url.replace('http://localhost:9000/dega/', '')
            : path + chartName,
        );
      } else {
        // upload file to minio
        url = await updateFormData(formData, path + chartName);
      }
      // send uploaded file url in api
    }

    const { tags, categories, ...values } = formData;
    const imageBlob = await view?.toImageURL('png', 1);

    onSubmit({
      title: chartName,
      data_url: url,
      config: { ...values, data: { url } },
      featured_medium: imageBlob,
      category_ids: categories,
      tag_ids: tags,
      template_id: data.id ? data.template_id : templateId,
      status: e.key,
      is_public: e.key === 'publish',
      published_date: e.key === 'publish' ? new Date() : null,
    });
  };

  const onDataChange = (rowIndex, columnIndex, newValue) => {
    const updatedValues = [...values];
    try {
      updatedValues[rowIndex][columnIndex] = values[rowIndex][columnIndex].constructor(newValue);
      setValues(updatedValues);

      let formData = form.getFieldValue();

      _.set(formData, ['data', 'values'], updatedValues);
      form.setFieldsValue(formData);
    } catch (error) {
      console.error(error);
    }
  };

  const IconSize = 20;
  let actions = [
    {
      name: 'Customize',
      Component: (
        <SettingOutlined
          style={{ fontSize: IconSize }}
          onClick={() => setShowOptions(!showOptions)}
        />
      ),
    },
    {
      name: 'Save',
      Component: (
        <Dropdown
          overlay={
            <div style={{ boxShadow: '0px 0px 6px 1px #999' }}>
              <Menu onClick={saveChart}>
                <Menu.Item key="draft">Draft</Menu.Item>
                <Menu.Item key="publish">Publish</Menu.Item>
              </Menu>
            </div>
          }
        >
          <SaveOutlined style={{ fontSize: IconSize }} onClick={() => setShowOptions(false)} />
        </Dropdown>
      ),
    },
    {
      name: 'Upload',
      Component: (
        <UploadOutlined style={{ fontSize: IconSize }} onClick={() => setShowModal(true)} />
      ),
    },
    {
      name: isDataView ? 'Chart' : 'Data',
      Component: isDataView ? (
        <AreaChartOutlined
          style={{ fontSize: IconSize }}
          onClick={() => setDataView(!isDataView)}
        />
      ) : (
        <DatabaseOutlined style={{ fontSize: IconSize }} onClick={() => setDataView(!isDataView)} />
      ),
    },
    {
      name: 'Options',
      Component: (
        <Dropdown
          overlay={
            <div style={{ boxShadow: '0px 0px 6px 1px #999' }}>
              <Menu onClick={downloadImage}>
                <Menu.Item key="svg">Download Image (SVG)</Menu.Item>
                <Menu.Item key="png">Download Image (PNG)</Menu.Item>
              </Menu>
              <Menu.Divider />
              <Menu onClick={downloadSampleData}>
                <Menu.Item>Download Sample</Menu.Item>
              </Menu>
            </div>
          }
        >
          <Button style={{ marginBottom: 5 }}>
            <MenuOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  if (data.id) {
    actions = [
      {
        name: '',
        Component: (
          <Popover
            content={
              <div style={{ width: 300, height: 'auto' }}>
                <Typography.Link
                  ellipsis
                  href={window.BINDU_CHART_VISUALIZATION_URL + '/' + data.id}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'block',
                  }}
                >
                  {window.BINDU_CHART_VISUALIZATION_URL + '/' + data.id}
                </Typography.Link>
                <br />
                <Typography.Text strong>Embed:</Typography.Text>
                <Typography.Text
                  copyable
                  ellipsis={{ rows: 1 }}
                  style={{
                    border: '1px solid',
                    padding: 4,
                    overflow: 'auto',
                    width: '100%',
                  }}
                >
                  {`<div class="factly-embed" data-src=${data.id}><script src="http://localhost:7002/resources/embed.js"></script></div>`}
                </Typography.Text>
              </div>
            }
            title="Export and publish"
            trigger="click"
          >
            <Button style={{ marginBottom: 5 }}>Export</Button>
          </Popover>
        ),
      },
      ...actions,
    ];
  }

  const actionsList = (
    <div className="extra-actions-container">
      <ul style={{ display: 'flex', alignItems: 'center' }}>
        {actions.map((item) => (
          <li key={item.name}>
            <Tooltip title={item.name}>{item.Component}</Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );

  if (isDataView && !(values.length && columns.length)) {
    const spec = form.getFieldValue();
    if (spec?.data?.values) {
      const newColumns = Object.keys(spec.data.values[0]).map((d) => {
        return {
          title: d,
          dataIndex: d,
        };
      });

      if (!columns.length) setColumns(newColumns);
      if (!values.length) setValues(spec.data.values);
    } else if (spec?.data?.url) {
      const url = spec.data.url;
      fetch(url)
        .then((res) => res.json())
        .then((newValues) => {
          const newColumns = Object.keys(newValues[0]).map((d) => {
            return {
              title: d,
              dataIndex: d,
            };
          });

          if (!columns.length) setColumns(newColumns);
          if (!values.length) setValues(newValues);
        });
    }
  }

  const { width: containerWidth = 0, height: containerHeight = 0 } =
    containerRef?.current?.getBoundingClientRect() || {};
  const { width: displayWidth = 0, height: displayHeight = 0 } =
    displayRef?.current?.getBoundingClientRect() || {};

  return (
    <>
      <div ref={containerRef} className="chart-area-container">
        <Form form={form} layout="horizontal">
          <Card
            title={<TitleComponent chartName={chartName} setChartName={setChartName} />}
            extra={actionsList}
            bodyStyle={{ overflow: 'auto', display: 'flex', padding: '0px', height: '80vh' }}
          >
            <div className="display-container" ref={displayRef}>
              <Form.Item noStyle shouldUpdate={true}>
                {(form) => {
                  return <Display form={form} setView={setView} />;
                }}
              </Form.Item>
            </div>

            {isDataView ? (
              <div ref={dataViewContainer} className="data-view-container">
                <DataViewer
                  columns={columns}
                  dataSource={values}
                  onDataChange={onDataChange}
                  scroll={{ x: containerWidth - displayWidth + 100, y: displayHeight - 40 }}
                />
              </div>
            ) : (
              <div className="option-container">
                <ChartOption form={form} templateId={data.template_id} isEdit={!!data.id} />
              </div>
            )}
          </Card>
        </Form>
      </div>
      <Modal
        title="Upload Dataset"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => setShowModal(false)}
        okText="Done"
      >
        <UppyUploader onUpload={onDataUpload} />
      </Modal>
    </>
  );
}

export default Chart;
