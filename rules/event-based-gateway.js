const { isAny } = require('bpmnlint-utils');

/**
 * Rule that validates gateways according to the following rules:
 *
 *  - An Event Based Gateway can only be connected to events.
 */
module.exports = function() {
  let gateway = null;

  function outgoingFlowsAreValid(gateway) {
    const outgoing = gateway.get('outgoing');
    return outgoing.filter(sequenceFlow => {
      const target = sequenceFlow.get('targetRef');
      return !isAny(target, ['bpmn:IntermediateCatchEvent', 'bpmn:EndEvent']);
    }).length === 0;
  }

  function check(gateway, reporter) {
    if (!isAny(gateway, ['bpmn:EventBasedGateway'])) {
      return;
    }

    const outgoing = gateway.get('outgoing');
    const valid = outgoing.filter(sequenceFlow => {
      const target = sequenceFlow.get('targetRef');
      const isValidType = isAny(target, ['bpmn:IntermediateCatchEvent', 'bpmn:EndEvent']);
      const onlyOneIncoming = target.get('incoming').length === 1;
      if (!isValidType) {
        reporter.report(target.id, 'Event Gateways target elements must be Catch Events');
      }
      if (!onlyOneIncoming) {
        reporter.report(target.id, 'Event Gateway target elements must not have additional incoming Sequence Flows');
      }
      return !isValidType || !onlyOneIncoming;
    }).length === 0;

    if (!valid) {
      reporter.report(gateway.id, 'Event Gateways target elements must be valid Catch Events');
    }
  }

  return { check };
};
