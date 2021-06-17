import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ThemeForm from './components/ThemeForm';
import Display from './components/Display';
import TemplateSelect from '../templates/components/TemplateSelect';

import { getTheme, updateTheme } from '../../actions/themes';

function EditTheme() {
  const { themeId: id } = useParams();

  const [themeConfig, setConfig] = React.useState({});

  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTheme(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const { theme, loading } = useSelector(({ themes }) => {
    return {
      theme: themes.details[id] ? themes.details[id] : null,
      loading: themes.loading,
    };
  });

  React.useEffect(() => {
    if (theme?.config) setConfig(theme.config);
  }, [theme]);

  const onUpdate = (values) => {
    dispatch(
      updateTheme({
        ...values,
        id,
      }),
    ).then(() => {
      history.push('/themes');
    });
  };

  const onChange = (values) => {
    if (values.config) {
      try {
        const config = JSON.parse(values.config);
        setConfig(config);
      } catch {
        console.log('Config is not JSON');
      }
    }
  };

  if (loading) return null;

  return (
    <div style={{ display: 'flex', height: '80vh' }}>
      <div style={{ flex: 1, height: '100%', overflow: 'auto' }}>
        <TemplateSelect theme={themeConfig} />
      </div>
      <div style={{ flex: 1, height: '100%', overflow: 'auto' }}>
        <ThemeForm onSubmit={onUpdate} onChange={onChange} data={theme} />
      </div>
    </div>
  );
}

export default EditTheme;
