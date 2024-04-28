import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { fetchFoods } from "../../redux/foods/foodsActions";

//MUI
import { Box, LinearProgress } from "@material-ui/core";
import Pagination from "@mui/material/Pagination";
import {
  DataGrid, faIR, gridPageCountSelector,
  gridPageSelector,
  useGridApiContext, useGridSelector
} from "@mui/x-data-grid";
import { createFakeServer } from "@mui/x-data-grid-generator";
import { Grid, Typography } from "mui-core";

//ICONS
import { FaUser } from "react-icons/fa";
import { IoFileTrayFull } from "react-icons/io5";

//HELPER
import getAccessToken from "../../helper/getAccesstoken";
import NumberWithCommas from "../../helper/price";

//USINGS
import moment from "moment-jalaali";
import ConfirmDialog from "../../components/confirmDialog/ConfirmDialog";

//permission
import { DeleteOutlineOutlined, DiningOutlined } from "@material-ui/icons";
import { BiPlusCircle } from "react-icons/bi";
import { MdOutlineNoFood } from "react-icons/md";
import { DeleteFood, FoodDeletion } from "../../helper/requestList";
import Services from "../../helper/http";

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
const LoanRequestList = () => {

  const services = new Services();

  const history = useHistory();
  //redux
debugger
  const allFoodsData = useSelector((state) => state.foodList);
  console.log(allFoodsData.loading);
  const { allFoods, loading } = allFoodsData;
  const foodsDataa = allFoods.data
  const totlaR = allFoods.count;

  //states
  const [modalTitle, setModalTitle] = useState();
  const [rows, setRows] = useState([]);
  const [loadings, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [confirmDialog, SetConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
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


  function deleteFood(id,name) {
    
    SetConfirmDialog({
      ...confirmDialog,isOpen: false
    });
    setLoading(true)
    services.delete(DeleteFood + `/${id}`)
      .then(async (res) => {
        if (res.isSuccess) {
          toast.success(res.message, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          dispatch(fetchFoods({ PageNumber: page, PageSize: pageSize }));
          setTimeout(() => {
            history.push(`/admin/foods`);
          }, 2000);
        }
        else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_CENTER
          });
          setLoading(false)
        }
      })
  }

  const dispatch = useDispatch();
  //grid columns
  const columns = [
    {
      field: '',
      headerName: '',
      flex: 1
    },
    {
      field: "foodName",
      headerName: "نام غذا",
      width: 200
    },
    {
      field: "delete",
      headerName: "حذف",
      renderCell: (foodRow) => {
        const onClick = () => {
          SetConfirmDialog({
            ...confirmDialog,
            isOpen: true,
            title: `${foodRow.row.foodName} حذف گردد؟`,
            onConfirm: () => deleteFood(foodRow.row._id, foodRow.row.foodName),
            delete:true
          });
          // deleteFood(foodRow)
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
                lineHeight: '0'
              }}
            >
              <DeleteOutlineOutlined />
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
          history.push(`/admin/edit-food?id=${roleRow.row._id}`);
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
                lineHeight: '0'
              }}
            >
              <IoFileTrayFull />
            </button>
          </>
        );
      },
    }
  ];
  function loadServerRows(page, foodsDataa) {
    return new Promise((resolve) => {
      if (foodsDataa) {
        resolve(foodsDataa);
      }
    });
  }

  useEffect(() => {
    let active = true;
    (async () => {
      
      setLoading(true);
      const foodsRows= await loadServerRows(page, foodsDataa);
      if (!active) {
        return;
      }
      setRows(foodsRows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page, allFoods]);

  useEffect(() => {
    dispatch(fetchFoods({ PageNumber: page, PageSize: pageSize }));
  }, []);

  const handlePageChange = (event) => {
    setPage(event);
  };
  function cancel() {
    alert(
      'sdfsdf'
    )
  }
  return (
    <div className="page">
      <Box sx={{ marginBottom: '6px' }}>
        <Grid container className="align-item-center pt-3">
          <Box className="page_title" sx={{ pb: 0 }}>
            <Typography><DiningOutlined style={{ marginLeft: '8px' }} />لیست</Typography>
          </Box>
          <Box className="page_toolbar">

            <button
              className="btn btn-success"
              onClick={() => {
                history.push(`/admin/add-food`);
              }}
            >
              <BiPlusCircle />
              ثبت جدید
            </button>
          </Box>
        </Grid>
      </Box>

      <div className="gridWrapper inRtl">
        <DataGrid
          rows={rows}
          rowCount={totlaR}
          loading={allFoodsData?.loading}
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
              <Box className="d-flex align-items-center justify-content-center h-100 flex-column" sx={{ mt: 1 }}>
                <MdOutlineNoFood size={60} style={{ color: '#b3c8e3' }} />
                <div className="mt-2">هیچ غذایی وجود ندارد</div>
              </Box>
            ),
            NoResultsOverlay: () => (
              <div>
                <Box sx={{ mt: 1 }}>هیچ غذایی وجود ندارد</Box>
              </div>
            ),
          }}
        />
      </div>
      <ConfirmDialog ConfirmDialog={confirmDialog} setConfirmDialog={SetConfirmDialog} cancel={() => cancel} />
    </div>
  );
};

export default LoanRequestList;
