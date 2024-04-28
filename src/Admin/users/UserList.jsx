import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/users/usersActions";

//MUI
import {
  Box,
  Grid,
  LinearProgress,
  TextField,
  CircularProgress,
  Button,
  Typography,
} from "@material-ui/core";
import Pagination from "@mui/material/Pagination";
import {
  DataGrid,
  faIR,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { createFakeServer } from "@mui/x-data-grid-generator";

//ICONS
import { IoFileTrayFull } from "react-icons/io5";
import {
  DeleteOutlineOutlined,
  DiningOutlined,
  Filter,
  Filter1TwoTone,
  GroupsOutlined,
  Save,
  Search,
} from "@material-ui/icons";
import { RiDeleteBin5Line, RiFilterOffFill } from "react-icons/ri";
import { BiPlusCircle } from "react-icons/bi";

//HELPER
import getAccessToken from "../../helper/getAccesstoken";
import { DeleteUser } from "../../helper/requestList";
import Services from "../../helper/http";

//USINGS
import moment from "moment-jalaali";
import { toast } from "react-toastify";
import ConfirmDialog from "../../components/confirmDialog/ConfirmDialog";

moment.loadPersian({ usePersianDigits: true });

const { columns, initialState, useQuery } = createFakeServer();

export function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

// LIST COMPONENT
const UserList = () => {
  const services = new Services();

  const history = useHistory();
  //redux
  const allUsersData = useSelector((state) => state.users);
  console.log(allUsersData.loading);
  const { allUsers, loading } = allUsersData;
  const usersDataa = allUsers.data;
  const totlaR = allUsers.count;

  //states
  const [rows, setRows] = useState([]);
  const [loadings, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [confirmDialog, SetConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [filter, setFilter] = useState({
    personNumber: "",
    username: "",
  });

  //auth
  const Authorization = getAccessToken();

  const dispatch = useDispatch();

  //for dataTable
  const queryOptions = useMemo(
    () => ({
      page,
      pageSize,
    }),
    [page, pageSize]
  );
  const { isLoading, data, pageInfo } = useQuery(queryOptions);

  const [rowCountState, setRowCountState] = useState(
    pageInfo?.totalRowCount || 0
  );

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      pageInfo?.totalRowCount !== undefined
        ? pageInfo?.totalRowCount
        : prevRowCountState
    );
  }, [pageInfo?.totalRowCount, setRowCountState]);

  function deleteUser(id, name) {
    SetConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setLoading(true);
    services.delete(DeleteUser + `/${id}`).then(async (res) => {
      if (res.isSuccess) {
        toast.error(res.message, {
          position: toast.POSITION.TOP_CENTER,
          icon: ({ theme, type }) => <RiDeleteBin5Line size={48} />,
        });
        dispatch(fetchUsers());
        setTimeout(() => {
          history.push(`/admin/users`);
        }, 2000);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
      }
    });
  }

  //grid columns -----------------------------------------
  const columns = [
    {
      field: "",
      headerName: "",
      flex: 1,
    },
    {
      field: "personNumber",
      headerName: "کد پرسنلی",
      width: 200,
    },
    {
      field: "firstName",
      headerName: "نام",
      width: 200,
    },
    {
      field: "lastName",
      headerName: "نام خانوادگی",
      width: 200,
    },
    {
      field: "username",
      headerName: "نام کاربری",
      width: 200,
    },
    {
      field: "delete",
      headerName: "حذف",
      renderCell: (userRow) => {
        const onClick = () => {
          SetConfirmDialog({
            ...confirmDialog,
            isOpen: true,
            title: `کاربر زیر حذف گردد؟`,
            subTitle: `${userRow.row.firstName + " " + userRow.row.lastName}`,
            onConfirm: () =>
              deleteUser(
                userRow.row._id,
                userRow.row.firstName + " " + userRow.row.lastName
              ),
            delete: true,
          });
          // deleteUser(userRow)
        };
        return (
          <>
            <button
              onClick={onClick}
              className="btn"
              style={{
                fontSize: "22px",
                margin: "auto",
                display: "block",
                color: "rgb(231 114 117)",
                lineHeight: "0",
                padding: "2px 4px",
              }}
            >
              <DeleteOutlineOutlined style={{ margin: 0 }} />
            </button>
          </>
        );
      },
    },
    {
      field: "edit",
      headerName: "ویرایش",
      renderCell: (roleRow) => {
        const onClick = (e, i) => {
          history.push(`/admin/edit-user?id=${roleRow.row._id}`);
        };
        return (
          <>
            <button
              onClick={onClick}
              className="btn"
              style={{
                fontSize: "22px",
                margin: "auto",
                display: "block",
                color: "rgb(107 116 215)",
                lineHeight: "0",
                padding: "2px 4px",
              }}
            >
              <IoFileTrayFull style={{ margin: 0 }} />
            </button>
          </>
        );
      },
    },
  ];
  //------------------------------------------------------

  function loadServerRows(page, usersDataa) {
    return new Promise((resolve) => {
      if (usersDataa) {
        resolve(usersDataa);
      }
    });
  }

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const usersRows = await loadServerRows(page, usersDataa);
      if (!active) {
        return;
      }
      setRows(usersRows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page, allUsers]);

  useEffect(() => {
    dispatch(fetchUsers({ PageNumber: page, PageSize: pageSize, filter }));
  }, []);

  const handlePageChange = (event) => {
    setPage(event);
  };

  function submitFilter() {
    dispatch(fetchUsers({ PageNumber: page, PageSize: pageSize, filter }));
  }

  function cancelFilter() {
    setFilter({
      personNumber: "",
      username: "",
    });
    dispatch(fetchUsers({ PageNumber: page, PageSize: pageSize, filter: {} }));
  }
  return (
    <div className="page">
      <Box sx={{ marginBottom: "6px" }}>
        <Grid container className="align-item-center pt-3">
          <Box className="page_title" sx={{ pb: 0 }}>
            <Typography>
              <DiningOutlined style={{ marginLeft: "8px" }} />
              مدیریت کاربران
            </Typography>
          </Box>
          <Box className="page_toolbar">
            <button
              className="btn btn-success"
              onClick={() => {
                history.push(`/admin/add-user`);
              }}
            >
              <BiPlusCircle />
              ثبت کاربر جدید
            </button>
          </Box>
        </Grid>
      </Box>
      <div className="grayBox mb-1">
        <Grid container spacing={0}>
          <Grid item xs={12} lg={2} md={3}>
            <Box sx={{ m: 1 }}>
              <TextField
                id="outlined-basic"
                name="personNumber"
                label="کد پرسنلی"
                variant="outlined"
                size="small"
                fullWidth
                // onKeyDown={e => JustNumberInputCheck(e)}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    personNumber: e.target.value,
                  })
                }
                value={filter?.personNumber}
                type="text"
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={2} md={3}>
            <Box sx={{ m: 1, ml: 0 }}>
              <TextField
                id="outlined-basic"
                name="username"
                label="نام کاربری"
                variant="outlined"
                size="small"
                type="text"
                fullWidth
                onChange={(e) =>
                  setFilter({ ...filter, username: e.target.value })
                }
                value={filter?.username}
              />
            </Box>
          </Grid>

          <Grid item>
            <Box sx={{ m: 1, mr: 0 }}>
              <Button onClick={cancelFilter} color="inherit" variant="text">
                <RiFilterOffFill size={21.5} />
              </Button>
              <Button
                disabled={isLoading}
                loadingPosition="start"
                color={
                  Object.values(filter).some((value) => value != "")
                    ? "info"
                    : "inherit"
                }
                sx={{ boxShadow: 0 }}
                variant="contained"
                onClick={submitFilter}
              >
                {isLoading ? (
                  <>
                    <CircularProgress
                      size={21.5}
                      sx={{ color: "white", marginLeft: 1 }}
                    />
                    <span>صبر کنید..</span>
                  </>
                ) : (
                  <>
                    <Search />
                  </>
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>
      <div className="gridWrapper inRtl">
        <DataGrid
          rows={rows}
          rowCount={totlaR}
          loading={allUsersData?.loading}
          rowsPerPageOptions={[25]}
          pagination
          page={page}
          rowHeight={40}
          pageSize={pageSize}
          getRowId={(row) => row._id}
          localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
          paginationMode="client"
          onPageChange={(newPage) => handlePageChange(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          columns={columns}
          initialState={initialState}
          totalRowCount
          onCellDoubleClick={(params, event) => {
            history.push(`/admin/edit-user?id=${params.id}`);
          }}
          toolbar={() => (
            <div>
              <span>تعداد: {totlaR}</span>
            </div>
          )}
          components={{
            Pagination: CustomPagination,
            LoadingOverlay: () => (
              <div className="GridLoading">
                <LinearProgress />
              </div>
            ),
            NoRowsOverlay: () => (
              <Box
                className="d-flex align-items-center justify-content-center h-100 flex-column"
                sx={{ mt: 1 }}
              >
                <GroupsOutlined
                  style={{
                    color: "#b3c8e3",
                    fontSize: "80px",
                    marginBottom: "-20px",
                  }}
                />
                <div className="mt-2">هیچ کاربری وجود ندارد</div>
              </Box>
            ),
            NoResultsOverlay: () => (
              <div>
                <Box sx={{ mt: 1 }}>هیچ کاربری وجود ندارد</Box>
              </div>
            ),
          }}
        />
      </div>
      <ConfirmDialog
        ConfirmDialog={confirmDialog}
        setConfirmDialog={SetConfirmDialog}
        // cancel={() => cancel}
      />
    </div>
  );
};

export default UserList;
