import { DateRange } from '@material-ui/icons';
import { Typography } from 'mui-core';
import React from 'react';
import { PageHead } from '../../components/pageHead/pageHead';
import { DefinitionFoodOnCalendar } from '../../components/bigCalendar/PlanCalendar';

const DefFoodOnCalendar = () => {
    return (
        <div className="page">
            <PageHead>
                <Typography><DateRange style={{ marginLeft: '8px' }} />تعریف</Typography>
            </PageHead>
            <DefinitionFoodOnCalendar fit />
            {/* <MyCalendar1 fit /> */}
        </div>
    )
}

export default DefFoodOnCalendar