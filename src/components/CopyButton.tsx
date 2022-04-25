import CopyToClipboard from 'react-copy-to-clipboard';
import tinycolor from 'tinycolor2';

import notify from '@/lib/toast';

function CopyButton({ children, color, copiedText = 'Copied!' }) {
  const isDark = tinycolor(color).isDark();
  return (
    <CopyToClipboard
      text={color}
      onCopy={() =>
        notify({
          text: copiedText,
          style: {
            backgroundColor: color,
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
