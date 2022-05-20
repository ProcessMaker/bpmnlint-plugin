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
      return;
    }

    if (typeof window !== 'undefined' && window.ProcessMaker.globalProcesses) {
      const processList = window.ProcessMaker.globalProcesses;
      let config = callActivity.get('config');
      try {
        config = JSON.parse(config);
      } catch (e) {
        config = false;
      }
      const isValid = config && checkValidProcesses(processList, callActivity.get('calledElement'), config.startEvent);
      if (!isValid) {
        reporter.report(callActivity.id, 'Call Activity must have a child process and a start event selected');
      }
    }
  }

  return { check };
};

function checkValidProcesses(processes, calledElement, startEvent) {
  const [bpmnId, processId] = calledElement.split('-');
  return processes.find(process => {
    if (process.id == processId || process.package_key == processId) {
      // System processes don't have a start event configured in the callActivity
      // so we won't verify it.
      if (!isAllowedProcess(process.package_key) && process.category && process.category.is_system) {
        return true;
      }

      return filterValidStartEvents(process.events).find(event => event.id == startEvent) != undefined;
    }
    return false;
  }) !== undefined;
}

function isAllowedProcess(packageKey) {
  return [
    'package-actions-by-email/sub-process',
  ].includes(packageKey);
}

function filterValidStartEvents(events) {
  return events.filter(event => {
    // Should not have event definitions like (signal, message, timer, ...)
    if (event.eventDefinitions && event.eventDefinitions.length > 0) {
      return false;
    }
    // Should not be a web entry
    if (event.config) {
      try {
        const config = JSON.parse(event.config);
        if (config.web_entry) {
          return false;
        }
      } catch (e) {
        // Invalid config property
        return false;
      }
    }
    return true;
  });
}
