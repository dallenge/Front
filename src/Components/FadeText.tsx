import { useEffect, useState } from 'react';

function FadeText({ textArray }: { textArray: string[] }) {
  const [text, setText] = useState<string>(textArray[1]);

  useEffect(() => {
    let count = 0;
    setInterval(() => {
      setText(textArray[count % textArray.length]);
      ++count;
    }, 5000);
  }, []);

  return <>{text}</>;
}
export default FadeText;
