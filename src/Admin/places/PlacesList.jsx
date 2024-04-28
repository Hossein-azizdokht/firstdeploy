import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaces } from "../../redux/places/placesActions";

//MUI
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  LinearProgress,
  TextField,
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

//HELPER
import getAccessToken from "../../helper/getAccesstoken";

//USINGS
import moment from "moment-jalaali";
import ConfirmDialog from "../../components/confirmDialog/ConfirmDialog";

//permission
import { DeleteOutlineOutlined, Payment, Search } from "@material-ui/icons";
import { RiDeleteBin5Line, RiFilterOffFill } from "react-icons/ri";

import { BiPlusCircle } from "react-icons/bi";
import { MdOutlineNoteAlt } from "react-icons/md";
import Services from "../../helper/http";
import { DeletePlace } from "../../helper/requestList";

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

//PLACES LIST COMPONENT
const PlacesList = () => {
  const services = new Services();

  const history = useHistory();
  //redux
  debugger;
  const allPlacesData = useSelector((state) => state.places);
  const { allPlaces, loading } = allPlacesData;
  const loansDataa = allPlaces.data;
  const totlaR = allPlaces?.totalRows;

  //states
  const [modalTitle, setModalTitle] = useState();
  const [rows, setRows] = useState([]);
  const [loadings, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [confirmDialog, SetConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [filter, setFilter] = useState({
    loanNumber: "",
    title: "",
  });
  //auth
  const Authorization = getAccessToken();

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

  function deletePlace(id, name) {
    SetConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setLoading(true);
    services.delete(DeletePlace + `/${id}`).then(async (res) => {
      if (res.isSuccess) {
        toast.error(res.message, {
          position: toast.POSITION.TOP_CENTER,
          icon: ({ theme, type }) => <RiDeleteBin5Line size={48} />,
        });
        dispatch(fetchPlaces());
        setTimeout(() => {
          history.push(`/admin/places`);
        }, 2000);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
      }
    });
  }

  const dispatch = useDispatch();
  //grid columns
  const columns = [
    {
      field: "",
      headerName: "",
      flex: 1,
    },
    {
      field: "capacity",
      headerName: "ظرفیت",
      width: 200,
    },
    {
      field: "dateTo",
      headerName: "تا تاریخ",
      width: 200,
      renderCell: (date) => {
        return <>{moment(date.row.dateTo).format("jYYYY/jMM/jDD")}</>;
      },
    },
    {
      field: "dateFrom",
      headerName: "از تاریخ",
      width: 200,
      renderCell: (date) => {
        return <>{moment(date.row.dateFrom).format("jYYYY/jMM/jDD")}</>;
      },
    },
    {
      field: "title",
      headerName: "نام اقامتگاه",
      width: 200,
    },
    {
      field: "code",
      headerName: "کد اقامتگاه",
      width: 200,

      renderCell: (loan) => (
        <div className="w-100">
          {loan.row.amount}
          <span
            className="me-2"
            style={{ color: "var(--toastify-color-progress-success)" }}
          ></span>
        </div>
      ),
    },
    {
      field: "delete",
      headerName: "حذف",
      renderCell: (placeRow) => {
        const onClick = () => {
          SetConfirmDialog({
            ...confirmDialog,
            isOpen: true,
            title: `اقامتگاه زیر حذف گردد؟`,
            subTitle: `${placeRow.row.title}`,
            onConfirm: () => deletePlace(placeRow.row._id, placeRow.row.title),
            delete: true,
          });
          // deleteLoan(loanRow)
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
                color: "#b22930",
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
          history.push(`/admin/edit-place?id=${roleRow.row._id}`);
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
  function loadServerRows(page, loansDataa) {
    return new Promise((resolve) => {
      if (loansDataa) {
        resolve(loansDataa);
      }
    });
  }

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const loansRows = await loadServerRows(page, loansDataa);
      if (!active) {
        return;
      }
      setRows(loansRows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page, allPlaces]);

  useEffect(() => {
    dispatch(fetchPlaces({ PageNumber: page, PageSize: pageSize }));
  }, [page]);

  const handlePageChange = (event) => {
    setPage(event);
  };

  function submitFilter() {
    dispatch(fetchPlaces({ PageNumber: 0, PageSize: pageSize, filter }));
  }

  function cancelFilter() {
    setFilter({
      loanNumber: "",
      title: "",
    });
    dispatch(fetchPlaces({ PageSize: pageSize, filter: {} }));
  }

  return (
    <div className="page">
      <Box sx={{ marginBottom: "6px" }}>
        <Grid container className="align-item-center pt-3">
          <Box className="page_title" sx={{ pb: 0 }}>
            <Typography>
              <Payment style={{ marginLeft: "8px" }} />
              مدیریت اقامتگاه‌ها
            </Typography>
          </Box>
          <Box className="page_toolbar">
            <button
              className="btn btn-info"
              onClick={() => {
                history.push(`/admin/add-place`);
              }}
            >
              <BiPlusCircle />
              ثبت اقامتگاه جدید
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
                name="loanNumber"
                label="کد اقامتگاه"
                variant="outlined"
                size="small"
                fullWidth
                // onKeyDown={e => JustNumberInputCheck(e)}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    loanNumber: e.target.value,
                  })
                }
                value={filter?.loanNumber}
                type="text"
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={2} md={3}>
            <Box sx={{ m: 1, ml: 0 }}>
              <TextField
                id="outlined-basic"
                name="title"
                label="نام اقامتگاه"
                variant="outlined"
                size="small"
                type="text"
                fullWidth
                onChange={(e) =>
                  setFilter({ ...filter, title: e.target.value })
                }
                value={filter?.title}
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
          loading={allPlacesData?.loading}
          rowsPerPageOptions={[10]}
          pagination
          page={page}
          rowHeight={40}
          pageSize={pageSize}
          getRowId={(row) => row._id}
          localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
          paginationMode="server"
          onPageChange={(newPage) => handlePageChange(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          columns={columns}
          initialState={initialState}
          onCellDoubleClick={(params, event) => {
            history.push(`/admin/edit-loan?id=${params.id}`);
          }}
          totalRowCount
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
                <MdOutlineNoteAlt size={60} style={{ color: "#b3c8e3" }} />
                <div className="mt-2">هیچ اقامتگاهی وجود ندارد</div>
              </Box>
            ),
            NoResultsOverlay: () => (
              <div>
                <Box sx={{ mt: 1 }}>هیچ اقامتگاهی وجود ندارد</Box>
              </div>
            ),
          }}
        />
      </div>
      <ConfirmDialog
        ConfirmDialog={confirmDialog}
        setConfirmDialog={SetConfirmDialog}
      />
    </div>
  );
};

export default PlacesList;
