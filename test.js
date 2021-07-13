const readModdle = require('bpmnlint/lib/testers/helper').readModdle;
const RuleTester = require('./rule-tester');

const gatewayDirectionRule = require('./rules/gateway-direction');
const callActivityChildProcessRule = require('./rules/call-activity-child-process');
const callActivitySequenceFlowRule = require('./rules/call-activity-sequence-flow');
const idRequiredRule = require('./rules/id-required');
const signalRefRequiredRule = require('./rules/signal-ref-required');
const eventBasedGatewayRule = require('./rules/event-based-gateway');

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
    },
    {
      moddleElement: readModdle('./test-diagrams/event-definitions.valid.bpmn')
    }
  ],
  invalid: [
    {
      moddleElement: readModdle('./test-diagrams/id-required.invalid.bpmn'),
      report: {
        id: null,
        message: 'Element is missing ID'
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

RuleTester.verify('event-based-gateway', eventBasedGatewayRule, {
  valid: [
    {
      moddleElement: readModdle('./test-diagrams/event-based-gateway.valid.bpmn')
    },
  ],
  invalid: [
    {
      moddleElement: readModdle('./test-diagrams/event-based-gateway.invalid.bpmn'),
      report: [
        {
          "category": "error",
          "id": "node_6",
          "message": "Event Gateway target elements must not have additional incoming Sequence Flows"
        },
        {
          "category": "error",
          "id": "node_2",
          "message": "Event Gateways target elements must be Catch Events"
        },
        {
          "category": "error",
          "id": "node_4",
          "message": "Event Gateways target elements must be Catch Events"
        },
        {
          "category": "error",
          "id": "node_3",
          "message": "Event Gateways target elements must be valid Catch Events"
        }
      ]
    },
  ]
});
