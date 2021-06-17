import React from 'react';
import * as vega from 'vega';
import { compile } from 'vega-lite';

import TemplateSelect from '../../templates/components/TemplateSelect';

function Display({ config, setView = () => {} }) {
  const refContainer = React.useRef(null);

  React.useEffect(() => {
    // renderChart(spec, mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div style={{ height: 'inherit', overflow: 'auto' }} ref={refContainer}></div>;
}

export default Display;
