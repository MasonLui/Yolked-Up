import yolkedup from '../yolkedup.jpg';
import yolkedupCopy from '../yolkedup copy.jpg';
 Header.jsx
export default function Header() {
  return (
    <header>
      <img src={yolkedup} alt="egg" />
      <h1>Yolked-Up</h1>
      <img src="yolkedup copy.jpg" alt="egg" />
    </header>
  );
}
