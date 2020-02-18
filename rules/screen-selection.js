const { isAny } = require('bpmnlint-utils');

/**
 * A rule that checks that all required screen selections have a selection
 */
module.exports = function() {
    let selectedScreen = null;

    function hasSelectedScreen() {
        screenRef = selectedScreen.get('screenRef');
        
        if (typeof screenRef === undefined || screenRef !== '') {
            return true;
        }
    
        return false;
    }

    function hasSelectedInterstitialScreen() {
        screenRef = selectedScreen.get('interstitialScreenRef');
        
        if (screenRef !== undefined) {
            return true;
        }

        return false;
    }

    function checkAllowInterstitial() {
        return selectedScreen.get('allowInterstitial');
    }

    function check(node, reporter) {
        if (!isAny(node, ['bpmn:Task', 'bpmn:ManualTask', 'bpmn:StartEvent'])) {
            return;
        }

        selectedScreen = node;

        if (!hasSelectedScreen()) {
            reporter.report(node.id, 'A selected screen is required');
        }

        if (checkAllowInterstitial() && !hasSelectedInterstitialScreen()) {
            reporter.report(node.id, 'A interstitial screen is required');
        }
    }

    return { check };
};