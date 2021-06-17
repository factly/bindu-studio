import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Display from '../../charts/display';
import { getTemplates } from '../../../actions/templates';
import { Select } from 'antd';

const { Option } = Select;

function TemplateSelect({ theme }) {
  const [selectedTemplateId, setTemplate] = React.useState({});
  //   const [mode, setMode] = React.useState('vega-lite');

  //   const history = useHistory();
  const dispatch = useDispatch();

  const categories = useSelector((state) => Object.values(state.categories.details));

  const templateOptions = categories
    .map((d) =>
      d.templates.map((template) => {
        return { id: template.id, spec: template.spec, mode: template.mode, title: template.title };
      }),
    )
    .flat();

  const selectedTemplate = templateOptions.find((d) => d.id === selectedTemplateId);

  React.useEffect(() => {
    dispatch(getTemplates());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ height: '80vh' }}>
      <div>
        <Select style={{ width: 120 }} onChange={setTemplate}>
          {templateOptions.map((template) => (
            <Option key={template.id} value={template.id}>
              {template.title}
            </Option>
          ))}
        </Select>
      </div>
      <div style={{ marginTop: '20px' }}>
        {selectedTemplate && (
          <Display theme={theme} spec={selectedTemplate.spec} mode={selectedTemplate.mode} />
        )}
      </div>
    </div>
  );
}

export default TemplateSelect;
