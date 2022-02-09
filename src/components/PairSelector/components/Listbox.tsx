import { useMediaQuery, useTheme, Typography } from "@mui/material";
import {
  forwardRef,
  HTMLAttributes,
  ReactChild,
  createContext,
  useContext,
} from "react";
import { VariableSizeList, ListChildComponentProps } from "react-window";
import { LISTBOX_PADDING } from "../constants";
import { useResetCache } from "../hooks";

const renderRow = (props: ListChildComponentProps) => {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  };
  return (
    <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {dataSet[1]}
    </Typography>
  );
};

const OuterElementContext = createContext({});

const OuterElementType = forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

export const Listbox = forwardRef<HTMLDivElement, HTMLAttributes<HTMLElement>>(
  function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData: ReactChild[] = [];
    (children as ReactChild[]).forEach(
      (item: ReactChild & { children?: ReactChild[] }) => {
        itemData.push(item);
        itemData.push(...(item.children || []));
      }
    );
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
      noSsr: true,
    });
    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = () => {
      return itemSize;
    };

    const getHeight = () => {
      if (itemCount > 8) {
        return 8 * itemSize;
      }
      return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={other}>
          <VariableSizeList
            itemData={itemData}
            height={getHeight() + 2 + LISTBOX_PADDING}
            width="100%"
            ref={gridRef}
            outerElementType={OuterElementType}
            innerElementType="ul"
            itemSize={getChildSize}
            overscanCount={5}
            itemCount={itemCount}
          >
            {renderRow}
          </VariableSizeList>
        </OuterElementContext.Provider>
      </div>
    );
  }
);
