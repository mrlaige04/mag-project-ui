import {definePreset} from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const AppThemePreset = definePreset(Aura, {
  components: {
    button: {
      css: '.p-button-text { padding-left: 0; padding-right: 0; }'
    }
  },
  semantic: {
    primary: {
      '0': "{blue.0}",
      '50': "{blue.50}",
      '100': "{blue.100}",
      '200': "{blue.200}",
      '300': "{blue.300}",
      '400': "{blue.400}",
      '500': "{blue.500}",
      '600': "{blue.600}",
      '700': "{blue.700}",
      '8000': "{blue.800}",
      '900': "{blue.900}",
      '950': "{blue.950}"
    },
    formField: {
      borderRadius: '0.2rem',
    },
  }
});
