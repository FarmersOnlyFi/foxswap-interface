import React from 'react'

import { Panel, Grid, Row, Col, Container, PanelGroup } from 'rsuite'

export default function Bond() {
  return (
    <Container style={{ width: '100%', maxWidth: '950px' }}>
      <PanelGroup>
        <Panel shaded bordered style={{ border: '1px blue solid' }}>
          <Grid fluid>
            <Col>
              <Row xs={4}>
                <div className="show-col">xs={4}ddddddddddddddddddddddd</div>
              </Row>
              <Row xs={4} style={{ border: '1px blue solid' }}>
                <div className="show-col">asdf</div>
              </Row>
              <Row xs={4}>
                <div className="show-col">xs={4}</div>
              </Row>
              <Row xs={4}>
                <div className="show-col">xs={4}</div>
              </Row>
              <Row xs={4}>
                <div className="show-col">xs={4}</div>
              </Row>
              <Row xs={4}>
                <div>xs={4}</div>
              </Row>
            </Col>
          </Grid>
        </Panel>
      </PanelGroup>
    </Container>
  )
}
