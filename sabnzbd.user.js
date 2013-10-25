// Remove all orphaned jobs
// This is a manual copy/paste into the developer console for now

var forms = getElementsByTagAndClassName('form');
for (var i=0; i < forms.length; i++) {
    if (forms[i].method == "get" && forms[i].action.match(/delete/)) {
        removeOrphan(forms[i]);
    }
}

function removeOrphan(element) {
    var d = doXHR(window.location.pathname + 'status/delete', { queryString: formContents(element) });
    d.addCallback(function (result) {
        removeElement(element.parentNode.parentNode);
    });
    d.addErrback(function (err) {
        console.log('error', err);
    });
}
