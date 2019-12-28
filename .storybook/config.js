
import { configure, addParameters } from '@storybook/react';
configure(require.context('../components', true, /.stories.jsx$/), module);