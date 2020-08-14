import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const checkBoxStyles = theme => ({
    root: {
      '&$checked': {
        color: '#388e3c',
      },
      '&:hover': {
      },
    },
    checked: {},
   })

export const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);