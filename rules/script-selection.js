const { is } = require('bpmnlint-utils');

/**
 * A rule that checks that all required screen selections have a selection
 */
module.exports = function() {
    let selectedScript = null;
    let scriptRef = null;

    function hasSelectedScript() {
        if (scriptRef !== '') {
            return true;
        }

        return false;
    }

    function check(node, reporter) {
        if (!is(node, 'bpmn:ScriptTask')) {
            return;
        }
        selectedScript = node;
        scriptRef = selectedScript.get('scriptRef');

        if (!hasSelectedScript()) {
            reporter.report(node.id, 'A selected script is required');
        }
    }

    return { check };
};