const { is } = require('bpmnlint-utils');

/**
 * A rule that checks that sequence flows connected to call activities have a start event selected
 */
module.exports = function() {
  let sequenceFlow = null;

  function isConnectedToCallActivity() {
    return is(sequenceFlow.get('targetRef'), 'bpmn:CallActivity');
  }

  function startEventSelected() {
    return !!sequenceFlow.get('pm:startEvent');
  }

  function check(node, reporter) {
    if (!is(node, 'bpmn:SequenceFlow')) {
      return;
    }

    sequenceFlow = node;

    if (isConnectedToCallActivity() && !startEventSelected()) {
      reporter.report(sequenceFlow.id, 'Sequence flow must specify an EMPTY start event to utilize');
    }
  }

  return { check };
};
