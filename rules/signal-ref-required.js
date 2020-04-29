const { is, isAny } = require('bpmnlint-utils');

/**
 * This rule verifies that the Signal Event Definitions have a reference to a signal
 */
module.exports = function() {

  function hasEventDefinitions(node) {
    return node.eventDefinitions instanceof Array
      && node.eventDefinitions.length > 0;
  }

  function filterEventDefinitionsWithoutSignalRef(node) {
    return node.eventDefinitions.filter(
      eventDefinition => is(eventDefinition, 'bpmn:SignalEventDefinition')
        && !eventDefinition.signalRef
    );
  }

  function check(node, reporter) {
    if (!isAny(node, [
      'bpmn:StartEvent',
      'bpmn:EndEvent',
      'bpmn:IntermediateCatchEvent',
      'bpmn:IntermediateThrowEvent',
      'bpmn:BoundaryEvent',
    ])) {
      return;
    }

    if (!hasEventDefinitions(node)) {
      return;
    }

    const missing = filterEventDefinitionsWithoutSignalRef(node);
  
    if (missing.length > 0) {
      reporter.report(node.id, 'Missing signal reference');
    }
  }

  return { check };
};
