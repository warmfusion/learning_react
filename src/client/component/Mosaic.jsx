
import React from 'react';
import {render} from 'react-dom';

import MosaicPanel from './MosaicPanel.jsx';

require('../stylesheets/main.scss')


render(<MosaicPanel source="http://sensu.priv.future.net.uk/clients"/>, document.getElementById('app'));
