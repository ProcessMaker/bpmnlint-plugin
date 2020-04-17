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
      'bpmn:LinkEventDefinition',
      'bpmn:MessageEventDefinition',
      'bpmn:SignalEventDefinition',
      'bpmn:TerminateEventDefinition',
      'bpmn:TimerEventDefinition',
    ]);
  }

  function check(node, reporter) {
    if (is(node, 'bpmn:Definitions') || isNonBpmnType(node) || isEventDefinition(node)) {
      return;
    }

    const nodeId = (node.id || '').trim();

    if (nodeId.length === 0) {
      reporter.report(null, 'Element is missing ID');
      return;
    }

    if (!nodeId.match(/^[a-zA-Z][^\s][a-zA-Z0-9_-]+$/)) {
      reporter.report(node.id, 'Element ID must be a valid QName')
    }
  }

  return { check };
};
