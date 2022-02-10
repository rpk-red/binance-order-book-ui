/** @jsx jsx */ /** @jsxRuntime classic */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css, jsx } from "@emotion/react";
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridToolbarContainer,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { ReactElement } from "react";

const dataGridSx = {
  "& .MuiDataGrid-cell": {
    border: "none",
  },
};

const getColumns = (
  baseAsset: string,
  quoteAsset: string,
  precision: number
) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    {
      field: "price",
      headerName: `Price(${quoteAsset})`,
      width: 150,
      editable: false,
      sortable: false,
      valueFormatter: (params: GridValueFormatterParams) => {
        const formater = new Intl.NumberFormat("en-US", {
          maximumFractionDigits: precision,
        });
        const valueFormatted = formater.format(
          parseFloat(params.value as string)
        );
        return valueFormatted;
      },
    },
    {
      field: "size",
      headerName: `Size(${baseAsset})`,
      width: 150,
      editable: false,
      sortable: false,
    },
  ];

  return columns;
};

const IconPlaceholder = () => {
  return <div />;
};

const CustomToolbar = (title: string) => {
  return (
    <GridToolbarContainer>
      <h3 css={css({ paddingLeft: 10 })}>{title}</h3>
    </GridToolbarContainer>
  );
};

export interface OrderBookTableProps extends Omit<DataGridProps, "columns"> {
  title: string;
  baseAsset: string;
  quoteAsset: string;
  precision: number;
  depth?: Depth;
}

export const OrderBookTable = ({
  rows,
  title,
  baseAsset,
  quoteAsset,
  precision,
  depth = "15",
  ...otherProps
}: OrderBookTableProps): ReactElement => {
  const Toolbar = () => CustomToolbar(title);

  return (
    <div css={css({ width: "100%", minWidth: 400 })}>
      <DataGrid
        {...otherProps}
        sx={dataGridSx}
        disableColumnMenu
        rows={rows}
        columns={getColumns(baseAsset, quoteAsset, precision)}
        density="compact"
        hideFooter
        pageSize={parseInt(depth)}
        autoHeight
        getRowId={(row) => row.price}
        showCellRightBorder={false}
        showColumnRightBorder={false}
        rowCount={15}
        components={{
          Toolbar,
          ColumnResizeIcon: IconPlaceholder,
        }}
      />
    </div>
  );
};
