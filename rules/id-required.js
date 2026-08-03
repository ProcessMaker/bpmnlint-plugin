const { is, isAny } = require('bpmnlint-utils');

/**
 * A rule that checks the presence of a node ID.
 */
module.exports = function() {
  function isNonBpmnType(node) {
    return node.$type.startsWith('bpmndi') || node.$type.startsWith('dc');
  }

  function isExemptFromId(node) {
    return is(node, 'bpmn:EventDefinition') || isAny(node, [
      'bpmn:Expression',
      'bpmn:Documentation',
      'bpmn:InputOutputSpecification',
      'bpmn:InputSet',
      'bpmn:OutputSet',
    ]);
  }

  function check(node, reporter) {
    if (is(node, 'bpmn:Definitions') || isNonBpmnType(node) || isExemptFromId(node)) {
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
