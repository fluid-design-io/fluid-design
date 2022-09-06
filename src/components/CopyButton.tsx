import CopyToClipboard from 'react-copy-to-clipboard';
import tinycolor from 'tinycolor2';

import notify from '@/lib/toast';

function CopyButton({
  children,
  color = undefined,
  text = undefined,
  copiedText = 'Copied!',
}) {
  const isDark = color ? tinycolor(color).isDark() : false;
  return (
    <CopyToClipboard
      text={color || text}
      onCopy={() =>
        notify({
          text: copiedText,
          style: {
            backgroundColor: color || '#FFF',
            color: isDark ? '#FFF' : '#000',
          },
        })
      }
    >
      {children}
    </CopyToClipboard>
  );
}
export default CopyButton;
