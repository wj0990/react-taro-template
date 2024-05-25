// @ts-nocheck

import { withTooltip, TooltipProps } from '..';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [tagName: string]: any;
    }
  }
}

export const ACTooltip = withTooltip((props: any): any => {
  const { records, reContent } = props;
  const record = records[0];
  return (
    <group
      attrs={{ x: record.x, y: record.y }}
      style={{
        marginLeft: record.xMin,
        marginTop: record.y - 20,
      }}
    >
      {reContent && typeof reContent === 'function' && reContent(records)}
      {(!reContent || typeof reContent !== 'function') && (
        <text attrs={{ text: `${record.name}: ${record.sales}`, fontSize: 14, fill: '#000' }} />
      )}
    </group>
  );
});
