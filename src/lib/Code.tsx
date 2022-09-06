import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

import clsxm from './clsxm';

function Code({ content, ...props }) {
  return (
    <Highlight
      {...defaultProps}
      code={content}
      language={props?.language || 'jsx'}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={clsxm(`overflow-x-auto px-4`, props?.className)}>
          {tokens.map((line, i) => (
            <div key={`code-${i}`} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span
                  key={`code-span-${i}`}
                  {...getTokenProps({ token, key })}
                />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

export default Code;
