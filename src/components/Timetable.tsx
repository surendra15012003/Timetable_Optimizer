import React, { useState } from 'react';
import { Segment, Table, Header, Dimmer } from 'semantic-ui-react';
import { getRandomColorFromString } from '../util/utils';
var ReactGA = require('react-ga');

interface TimetableProps {
    start_hour: number;
    end_hour: number;
    timetable: any;
    nusmodsLink: string;
}

function Timetable({ start_hour, end_hour, timetable, nusmodsLink }: TimetableProps) {
    // let [dimmerActive, setDimmerActive] = useState(false);
    let hours: Array<String> = [];
    const days = 6;
    const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    console.log('timetable');
    console.log(timetable);
    for (let hour = start_hour; hour < end_hour; hour++) {
        // For each hour we need the hour and the 1/2 hour mark
        if (hour < 10) {
            hours.push(`0${hour}00`);
            hours.push(`0${hour}30`);
        } else {
            hours.push(`${hour}00`);
            hours.push(`${hour}30`);
        }
    }

    return (
        <div className="timetable">
            <Dimmer.Dimmable dimmed={!timetable.is_sat}>
                <Segment raised style={{ overflow: 'auto', maxWidth: '100%' }}>
                    <Header as="h2" textAlign="center">
                        Timetable Output
                        <br />
                        {nusmodsLink != '' ? (
                            <ReactGA.OutboundLink
                                eventLabel="Viewed timetable in NUSMods"
                                to={nusmodsLink}
                                target="_blank"
                                rel="noreferrer"
                                className="ui primary button"
                                style={{ backgroundColor: '#ff5138' }}
                            >
                                Click to see timetable in NUSMods!
                            </ReactGA.OutboundLink>
                        ) : null}
                    </Header>

                    <Table unstackable celled definition striped columns={16} compact>
                        <Table.Header>
                            <Table.Row textAlign="center">
                                <Table.HeaderCell />
                                {hours.map((hour, i) => {
                                    return <Table.HeaderCell key={i}>{hour}</Table.HeaderCell>;
                                })}
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {// Runs for each day
                            [...Array(days)].map((_, i1) => {
                                return (
                                    <Table.Row key={i1}>
                                        <Table.Cell key={i1} textAlign="center">
                                            {daysOfWeek[i1]}
                                        </Table.Cell>
                                        {hours.map((_, i2) => {
                                            if (
                                                Object.keys(timetable).length === 0 ||
                                                !timetable.is_sat
                                            ) {
                                                // Empty timetable
                                                return (
                                                    <Table.Cell
                                                        key={2 ** (i1 + 1) * 3 ** (i2 + 1)}
                                                        textAlign="center"
                                                    >
                                                        {''}
                                                    </Table.Cell>
                                                );
                                            } else {
                                                const cellMods = timetable.tt[i1][i2];
                                                if (
                                                    cellMods === [] ||
                                                    cellMods.length === 0 ||
                                                    cellMods === undefined
                                                ) {
                                                    return (
                                                        <Table.Cell
                                                            key={2 ** (i1 + 1) * 3 ** (i2 + 1)}
                                                            textAlign="center"
                                                        >
                                                            {''}
                                                        </Table.Cell>
                                                    );
                                                } else if (
                                                    cellMods.length === 1 &&
                                                    (cellMods[0].startsWith('TOO') ||
                                                        cellMods[0].startsWith('FREE'))
                                                ) {
                                                    return (
                                                        <Table.Cell
                                                            active
                                                            key={2 ** (i1 + 1) * 3 ** (i2 + 1)}
                                                            textAlign="center"
                                                        >
                                                            {''}
                                                        </Table.Cell>
                                                    );
                                                } else if (cellMods.length >= 1) {
                                                    return (
                                                        <Table.Cell
                                                            key={2 ** (i1 + 1) * 3 ** (i2 + 1)}
                                                        >
                                                            <Table>
                                                                {cellMods.map((mod: any) => {
                                                                    let modname = mod.split(
                                                                        '\n'
                                                                    )[0];
                                                                    let modcolor = getRandomColorFromString(
                                                                        modname
                                                                    );
                                                                    return (
                                                                        <Table.Row>
                                                                            <Table.Cell
                                                                                key={
                                                                                    2 ** (i1 + 1) *
                                                                                    3 ** (i2 + 1)
                                                                                }
                                                                                textAlign="center"
                                                                                style={{
                                                                                    backgroundColor: modcolor,
                                                                                }}
                                                                            >
                                                                                {mod}
                                                                            </Table.Cell>
                                                                        </Table.Row>
                                                                    );
                                                                })}
                                                            </Table>
                                                        </Table.Cell>
                                                    );
                                                    // return <Table.Cell key={(2 ** (i1 + 1)) * (3 ** (i2 + 1))} textAlign='center'>{timetable.tt[i1][i2]}</Table.Cell>;
                                                }
                                            }
                                        })}
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>
                </Segment>
                <Dimmer active={Object.keys(timetable).length > 0 && !timetable.is_sat}>
                    <Header as="h2" inverted color="red">
                        Sorry! No timetable meets these constraints. <br /> <br />
                        Please change your constraints or the list of modules.
                    </Header>
                </Dimmer>
                <Dimmer active={Object.keys(timetable).length === 0}>
                    <Header as="h2" inverted>
                        Add at least one module and some constraints and run the optimizer.
                    </Header>
                </Dimmer>
            </Dimmer.Dimmable>
        </div>
    );
}

export default Timetable;
