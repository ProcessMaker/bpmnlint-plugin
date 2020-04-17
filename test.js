const readModdle = require('bpmnlint/lib/testers/helper').readModdle;
const RuleTester = require('bpmnlint/lib/testers/rule-tester');

const gatewayDirectionRule = require('./rules/gateway-direction');
const callActivityChildProcessRule = require('./rules/call-activity-child-process');
const callActivitySequenceFlowRule = require('./rules/call-activity-sequence-flow');
const idRequiredRule = require('./rules/id-required');
const signalRefRequiredRule = require('./rules/signal-ref-required');

RuleTester.verify('gateway-direction', gatewayDirectionRule, {
  valid: [
    {
      moddleElement: readModdle('./test-diagrams/gateway-direction.diverging.valid.bpmn')
    },
    {
      moddleElement: readModdle('./test-diagrams/gateway-direction.converging.valid.bpmn')
    }
  ],
  invalid: [
    {
      moddleElement: readModdle('./test-diagrams/gateway-direction.converging.invalid.bpmn'),
      report: {
        id: 'node_3',
        message: 'Gateway must have multiple incoming Sequence Flows'
      }
    },
    {
      moddleElement: readModdle('./test-diagrams/gateway-direction.converging.invalid.2.bpmn'),
      report: {
        id: 'node_3',
        message: 'Gateway must not multiple outgoing Sequence Flows'
      }
    },
    {
      moddleElement: readModdle('./test-diagrams/gateway-direction.diverging.invalid.bpmn'),
      report: {
        id: 'node_2',
        message: 'Gateway must have multiple outgoing Sequence Flows'
      }
    },
    {
      moddleElement: readModdle('./test-diagrams/gateway-direction.diverging.invalid.2.bpmn'),
      report: {
        id: 'node_2',
        message: 'Gateway must not have multiple incoming Sequence Flows'
      }
    }
  ]
});

RuleTester.verify('call-activity-child-process', callActivityChildProcessRule, {
  valid: [
    {
      moddleElement: readModdle('./test-diagrams/call-activity-child-process.valid.bpmn')
    }
  ],
  invalid: [
    {
      moddleElement: readModdle('./test-diagrams/call-activity-child-process.invalid.bpmn'),
      report: {
        id: 'node_2',
        message: 'Call Activity must have child process selected'
      }
    }
  ]
});

RuleTester.verify('call-activity-sequence-flow', callActivitySequenceFlowRule, {
  valid: [
    {
      moddleElement: readModdle('./test-diagrams/call-activity-sequence-flow.valid.bpmn')
    }
  ],
  invalid: [
    {
      moddleElement: readModdle('./test-diagrams/call-activity-sequence-flow.invalid.bpmn'),
      report: {
        id: 'node_3',
        message: 'Sequence flow must specify an EMPTY start event to utilize'
      }
    }
  ]
});

RuleTester.verify('id-required', idRequiredRule, {
  valid: [
    {
      moddleElement: readModdle('./test-diagrams/id-required.valid.bpmn')
    }
  ],
  invalid: [
    {
      moddleElement: readModdle('./test-diagrams/id-required.invalid.bpmn'),
      report: {
        id: null,
        message: 'Element is missing ID'
      }
    },
    {
      moddleElement: readModdle('./test-diagrams/id-required.invalid2.bpmn'),
      report: {
        id: '1',
        message: 'Element ID must be a valid QName'
      }
    }
  ]
});

RuleTester.verify('signal-ref-required', signalRefRequiredRule, {
  valid: [
    {
      moddleElement: readModdle('./test-diagrams/start-event-signal-ref.valid.bpmn')
    },
    {
      moddleElement: readModdle('./test-diagrams/intermediate-catch-event-signal-ref.valid.bpmn')
    },
    {
      moddleElement: readModdle('./test-diagrams/intermediate-throw-event-signal-ref.valid.bpmn')
    },
    {
      moddleElement: readModdle('./test-diagrams/boundary-event-signal-ref.valid.bpmn')
    },
    {
      moddleElement: readModdle('./test-diagrams/end-event-signal-ref.valid.bpmn')
    }
  ],
  invalid: [
    {
      moddleElement: readModdle('./test-diagrams/start-event-signal-ref.invalid.bpmn'),
      report: {
        id: 'node_2',
        message: 'Missing signal reference'
      }
    },
    {
      moddleElement: readModdle('./test-diagrams/intermediate-catch-event-signal-ref.invalid.bpmn'),
      report: {
        id: 'node_2',
        message: 'Missing signal reference'
      }
    },
    {
      moddleElement: readModdle('./test-diagrams/intermediate-throw-event-signal-ref.invalid.bpmn'),
      report: {
        id: 'node_2',
        message: 'Missing signal reference'
      }
    },
    {
      moddleElement: readModdle('./test-diagrams/boundary-event-signal-ref.invalid.bpmn'),
      report: {
        id: 'node_2',
        message: 'Missing signal reference'
      }
    },
    {
      moddleElement: readModdle('./test-diagrams/end-event-signal-ref.invalid.bpmn'),
      report: {
        id: 'node_2',
        message: 'Missing signal reference'
      }
    },
  ]
});
