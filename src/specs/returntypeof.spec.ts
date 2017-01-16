import { returntypeof } from '..';

// testing returntypeof

type State = { authToken: number };
const mapStateToProps = (state: State, props: any) => ({
  token: state.authToken,
});
const stateProps = returntypeof(mapStateToProps);
type IProps = typeof stateProps;

const StatelessComponent = (props: IProps) => {
  return (props.token);
};
// assert true
if (StatelessComponent({ token: 4 }) !== 4) { process.exit(1); }
