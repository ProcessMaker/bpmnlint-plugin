const { is } = require('bpmnlint-utils');

/**
 * A rule that checks that call activities have a process selected
 */
module.exports = function() {
  let callActivity = null;

  function hasChildProcess() {
    return !!callActivity.get('calledElement');
  }

  function check(node, reporter) {
    if (!is(node, 'bpmn:CallActivity')) {
      return;
    }

    callActivity = node;

    if (!hasChildProcess()) {
      reporter.report(callActivity.id, 'Call Activity must have child process selected');
    }
  }

  return { check };
};
