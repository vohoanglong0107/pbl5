import {Box, Grid, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface CardItemProps {
    cardName: string,
    numberOfCards: Number
}
const CardItem = ({cardName, numberOfCards} : CardItemProps) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={8}><Typography sx={{fontFamily: 'Montserrat'}}>{cardName}</Typography></Grid>
            <Grid item xs={2}><Typography sx={{fontFamily: 'Montserrat'}}>{numberOfCards}</Typography></Grid>
            <Grid item xs={2}><DeleteIcon sx={{color: '#50E3C2'}} /></Grid>
        </Grid>
    )
}

export default CardItem;