const { isAny } = require('bpmnlint-utils');

/**
 * A rule that checks that all required screen selections have a selection
 */
module.exports = function() {
    let selectedScreen = null;
    let screenRef = null;
    let allowInterstitial = null;
    let interstitialScreenRef = null;
    
    function hasSelectedScreen() {
        if (screenRef !== '') {
            return true;
        }
    
        return false;
    }

    function hasSelectedInterstitialScreen() {
        if (interstitialScreenRef !== undefined) {
            return true;
        }

        return false;
    }

    function check(node, reporter) {
        
        if (!isAny(node, ['bpmn:Task', 'bpmn:ManualTask', 'bpmn:StartEvent'])) {
            return;
        }

        selectedScreen = node;
        screenRef = selectedScreen.get('screenRef');
        allowInterstitial = selectedScreen.get('allowInterstitial');
        interstitialScreenRef = selectedScreen.get('interstitialScreenRef');
        
        if (!hasSelectedScreen()) {
            reporter.report(node.id, 'A selected screen is required');
        }

        if (allowInterstitial && !hasSelectedInterstitialScreen()) {
            reporter.report(node.id, 'A interstitial screen is required');
        }
    }

    return { check };
};