'use client'

import MuiDemoColumns from "@/app/components/demo/module/mui-demo-columns";
import MuiDemoRows from "@/app/components/demo/module/mui-demo-rows";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { NextPage } from "next";



const MuiDemosPage : NextPage = () => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={MuiDemoRows()}
        columns={MuiDemoColumns()}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}


export default MuiDemosPage
