import Grid from '../components/Grid'
export default function Row(props) {
  return (
    <tr>
      <Grid rowIdx={props.rowIdx} rowVal={props.rowVal} />
    </tr>
  );
};