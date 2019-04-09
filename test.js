const readModdle = require('bpmnlint/lib/testers/helper').readModdle;
const RuleTester = require('bpmnlint/lib/testers/rule-tester');

const gatewayDirectionRule = require('./rules/gateway-direction');
const callActivityChildProcessRule = require('./rules/call-activity-child-process');

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
