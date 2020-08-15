import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { Color } from 'shared/styles/color';

const checkBoxStyles = () => ({
    root: {
      '&$checked': {
        color: Color.darkGreen(),
      },
      '&:hover': {
      },
    },
    checked: {},
   })

export const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);