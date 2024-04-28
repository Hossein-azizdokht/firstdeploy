import { Box, Grid } from '@material-ui/core'
import React, { Children } from 'react'
import GoBack from '../BackButton'

export const PageHead = ({ children }) => {
    return (
        <Box className="pageToolbar" sx={{ marginBottom: 1 }}>
            <Grid container className="align-item-center">
                <Box className="page_title" sx={{ p: 0 }}>
                    {children}
                </Box>
                <Box className="mr-auto">
                    <GoBack />
                </Box>
            </Grid>
        </Box>
    )
}
