import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

class InsightGrid extends Component {
  render() {
    const { classes } = this.props;
    let layout = [
      { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
      { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
      { i: 'c', x: 4, y: 0, w: 1, h: 2 }
    ];
    return (
      <div>
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          width={1200}
        >
          <Card className={classes.card} key="a">
            <CardContent>a</CardContent>
          </Card>
          <Card className={classes.card} key="b">
            <CardContent>b</CardContent>
          </Card>
          <Card className={classes.card} key="c">
            <CardContent>c</CardContent>
          </Card>
        </GridLayout>
      </div>
    );
  }
}

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

export default withStyles(styles)(InsightGrid);
