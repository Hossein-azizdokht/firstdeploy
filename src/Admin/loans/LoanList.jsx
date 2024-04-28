import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { fetchLoans } from "../../redux/loans/loansActions";

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

//HELPER
import getAccessToken from "../../helper/getAccesstoken";

//USINGS
import moment from "moment-jalaali";
import ConfirmDialog from "../../components/confirmDialog/ConfirmDialog";

//permission
import {
  DeleteOutlineOutlined,
  DiningOutlined,
  Payment,
  Search,
} from "@material-ui/icons";
import { RiDeleteBin5Line, RiFilterOffFill } from "react-icons/ri";

import { BiPlusCircle } from "react-icons/bi";
import {
  MdOutlineNoFood,
  MdOutlineNotAccessible,
  MdOutlineNoteAlt,
} from "react-icons/md";
import Services from "../../helper/http";
import { render } from "react-dom";
import NumberWithCommas from "../../helper/price";
import { DeleteLoan } from "../../helper/requestList";

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

//ROLE LIST COMPONENT
const LoanList = () => {
  const services = new Services();

  const history = useHistory();
  //redux
  debugger;
  const allLoansData = useSelector((state) => state.loans);
  const { allLoans, loading } = allLoansData;
  const loansDataa = allLoans.data;
  const totlaR = allLoans?.totalRows;

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

  function deleteLoan(id, name) {
    SetConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setLoading(true);
    services.delete(DeleteLoan + `/${id}`).then(async (res) => {
      if (res.isSuccess) {
        toast.error(res.message, {
          position: toast.POSITION.TOP_CENTER,
          icon: ({ theme, type }) => <RiDeleteBin5Line size={48} />,
        });
        dispatch(fetchLoans());
        setTimeout(() => {
          history.push(`/admin/loans`);
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
      field: "amount",
      headerName: "مبلغ تسهیلات",
      width: 200,

      renderCell: (loan) => (
        <div className="w-100 text-left">
          {NumberWithCommas(loan.row.amount)}
          <span
            className="me-2"
            style={{ color: "var(--toastify-color-progress-success)" }}
          >
            ریال
          </span>
        </div>
      ),
    },
    {
      field: "title",
      headerName: "نام تسهیلات",
      width: 200,
    },
    {
      field: "delete",
      headerName: "حذف",
      renderCell: (loanRow) => {
        const onClick = () => {
          SetConfirmDialog({
            ...confirmDialog,
            isOpen: true,
            title: `تسهیلات زیر حذف گردد؟`,
            subTitle: `${loanRow.row.title}`,
            onConfirm: () => deleteLoan(loanRow.row._id, loanRow.row.title),
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
          history.push(`/admin/edit-loan?id=${roleRow.row._id}`);
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
  }, [page, allLoans]);

  useEffect(() => {
    dispatch(fetchLoans({ PageNumber: page, PageSize: pageSize }));
  }, [page]);

  const handlePageChange = (event) => {
    setPage(event);
  };

  function submitFilter() {
    dispatch(fetchLoans({ PageNumber: 0, PageSize: pageSize, filter }));
  }

  function cancelFilter() {
    setFilter({
      loanNumber: "",
      title: "",
    });
    dispatch(fetchLoans({ PageSize: pageSize, filter: {} }));
  }

  return (
    <div className="page">
      <Box sx={{ marginBottom: "6px" }}>
        <Grid container className="align-item-center pt-3">
          <Box className="page_title" sx={{ pb: 0 }}>
            <Typography>
              <Payment style={{ marginLeft: "8px" }} />
              مدیریت تسهیلات
            </Typography>
          </Box>
          <Box className="page_toolbar">
            <button
              className="btn btn-info"
              onClick={() => {
                history.push(`/admin/add-loan`);
              }}
            >
              <BiPlusCircle />
              ثبت تسهیلات جدید
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
                label="شماره تسهیلات"
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
                label="نام تسهیلات"
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
          loading={allLoansData?.loading}
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
                <div className="mt-2">هیچ تسهیلاتی وجود ندارد</div>
              </Box>
            ),
            NoResultsOverlay: () => (
              <div>
                <Box sx={{ mt: 1 }}>هیچ تسهیلاتی وجود ندارد</Box>
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

export default LoanList;
