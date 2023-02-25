import { createTheme } from '@mui/material';
import { cyan, yellow } from '@mui/material/colors';

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: cyan[700],
            dark: cyan[800],
            light: cyan[500],
            contrastText: '#ffffff'
        },
        secondary: {
            main: yellow[700],
            dark: yellow[800],
            light: yellow[500],
            contrastText: '#ffffff'
        },
        background: {
            default: '#f7f6f3',
            paper: '#ffffff'
        }
    }
});