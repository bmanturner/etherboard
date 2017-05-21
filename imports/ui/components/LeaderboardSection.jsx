import { h } from 'preact';
import Row from 'preact-mui/lib/row';
import Col from 'preact-mui/lib/Col';
import LeaderPanel from './LeaderPanel';

const getColProps = (num) => {
  if (num === 1) return { md: 10, lg: 6, mdOffset: 1, lgOffset: 3 };
  else if (num === 2) return { md: 6, lg: 5, lgOffset: 1 };
  else if (num === 3) return { md: 6, lg: 5 };
  return { md: 6, lg: 4 };
};

const LeaderboardSection = ({ numLeaders, maxLeaders, loading, leaders }) => {
  const spots = [];
  for (let i = 0; i < maxLeaders; i += 1) {
    const colProps = getColProps(i + 1);
    const leader = _.find(leaders, ({ position }) => (position === i + 1));
    const key = leader ? leader.id : i;
    spots.push(
      <Col key={key} {...colProps}>
        <LeaderPanel
          position={i + 1}
          empty={(i + 1) > numLeaders}
          loading={leader ? false : loading}
          leader={leader}
        />
      </Col>
    );
  }

  return <Row style={{ marginTop: 35 }}>{spots}</Row>;
};


export default LeaderboardSection;
