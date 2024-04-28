import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Card, CardHeader, Typography } from 'mui-core';
import { CardGiftcard, Group, Monitor } from '@material-ui/icons';
import { Avatar } from '@mui/material'
import { NewspaperTwoTone, SolarPowerTwoTone } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import CountUp from "react-countup";
import { hasPermission, permissionEnum } from '../helper/permissions';
import Services from '../helper/http';

const Dashboard = () => {
    const services = new Services();


    //permission
    const canAll = hasPermission(permissionEnum.canAll);
    const canCustomer = hasPermission(permissionEnum.canCustomer);
    const canContract = hasPermission(permissionEnum.canContract);
    const canPowerhouse = hasPermission(permissionEnum.canPowerhouse);



    return (
        <div className="page dashboard">
            
            <Box sx={{ flexGrow: 1 }}>
                <Grid container>
                    <Box sx={{ p: 2, pb: 0, width: "100%" }}>
                        <Typography><Monitor style={{ marginLeft: '8px' }} />داشبورد</Typography>
                        <hr />
                    </Box>
                </Grid>

                <Grid container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} lg={3} md={4}>
                        <Grid container spacing={1}>
                            {(canAll || canPowerhouse) && (<Grid item xs={12} lg={12} md={12} sm={12}>
                                <Grid item className='mb-1 ml-1'>
                                    <Link to="/admin/projects">
                                        <Card style={{ boxShadow: '0 12px 16px -5px rgba(0,0,0,0.1)', borderRadius: '8px' }}>

                                            <CardHeader
                                                title={<CountUp duration={1} end={150} />}
                                                className="cardHeader blue p-2"
                                                // title="5"
                                                subheader="تعداد کارت‌ها"
                                                avatar={
                                                    <Avatar sx={{ bgcolor: "#59a6b3", width: 64, height: 64, marginLeft: 2 }}><CardGiftcard fontSize='large' /></Avatar>
                                                }
                                            >
                                            </CardHeader>
                                        </Card>
                                    </Link>
                                </Grid>
                            </Grid>)}
                            {(canAll || canCustomer) && (<Grid item xs={12} lg={12} md={12} sm={12}>
                                <Grid item className='mb-1 mr-1'>
                                    <Link to="/admin/customers">
                                        <Card style={{ boxShadow: '0 12px 16px -5px rgba(0,0,0,0.1)', borderRadius: '8px' }}>

                                            <CardHeader
                                                title={<CountUp duration={1} end={58} />}
                                                // title="8"
                                                className="cardHeader green p-2"
                                                subheader="تعداد چاپ شده"
                                                avatar={
                                                    <Avatar sx={{ bgcolor: "#72af72", width: 64, height: 64, marginLeft: 2 }}><Group fontSize='large' /></Avatar>
                                                }
                                            >
                                            </CardHeader>
                                        </Card>
                                    </Link>
                                </Grid>
                            </Grid>)}
                            {(canAll || canContract) && (<Grid item xs={12} lg={12} md={12} sm={12}>
                                <Grid item className='mb-1 ml-1'>
                                    <Link to="/admin/contracts">
                                        <Card style={{ boxShadow: '0 12px 16px -5px rgba(0,0,0,0.1)', borderRadius: '8px' }}>

                                            <CardHeader
                                                title={<CountUp duration={1} end={965} />}
                                                // title="8"
                                                className="cardHeader orange p-2"
                                                subheader="تعداد در صف"
                                                avatar={
                                                    <Avatar sx={{ bgcolor: "#f7a438", width: 64, height: 64, marginLeft: 2 }}><CardGiftcard fontSize='large' /></Avatar>
                                                }
                                            >
                                            </CardHeader>
                                        </Card>
                                    </Link>
                                </Grid>
                            </Grid>)}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                </Grid>
            </Box>
        </div>
    )
}

export default Dashboard;


