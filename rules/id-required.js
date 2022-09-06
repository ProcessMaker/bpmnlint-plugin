const { is, isAny } = require('bpmnlint-utils');

/**
 * A rule that checks the presence of a node ID.
 */
module.exports = function() {
  function isNonBpmnType(node) {
    return node.$type.startsWith('bpmndi') || node.$type.startsWith('dc');
  }

  function isEventDefinition(node) {
    return isAny(node, [
      'bpmn:CancelEventDefinition',
      'bpmn:CompensateDefinition',
      'bpmn:ErrorEventDefinition',
      'bpmn:EscalationEventDefinition',
      'bpmn:Expression',
      'bpmn:LinkEventDefinition',
      'bpmn:MessageEventDefinition',
      'bpmn:SignalEventDefinition',
      'bpmn:TerminateEventDefinition',
      'bpmn:TimeCycle',
      'bpmn:TimeDate',
      'bpmn:TimeDuration',
      'bpmn:TimerEventDefinition',
      'bpmn:Documentation',
      'bpmn:InputOutputSpecification',
      'bpmn:InputSet',
      'bpmn:OutputSet',
    ]);
  }

  function isLoopCharacteristic(node) {
    return isAny(node, [
        'bpmn:MultiInstanceLoopCharacteristics',
        'bpmn:StandardLoopCharacteristics',
    ]);
  }

  function isDocumentation(node) {
    return isAny(node, [
      'bpmn:Documentation',
    ]);
  }

  function check(node, reporter) {
    if (is(node, 'bpmn:Definitions')
        || isDocumentation(node)
        || isEventDefinition(node)
        || isLoopCharacteristic(node)
        || isNonBpmnType(node)) {
      return;
    }

    const nodeId = (node.id || '').trim();

    if (nodeId.length === 0) {
      reporter.report(null, 'Element is missing ID ' + node.$type);
      return;
    }
  }

  return { check };
};
