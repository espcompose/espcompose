(function() {
  // ── Stats ──────────────────────────────────────────────────────────────
  const stats = document.getElementById('stats');
  const data = IR_DATA;
  const pairs = [
    ['Sections', (data.sections || []).length],
    ['Bindings', (data.bindings || []).length],
    ['Reactive Nodes', (data.reactiveNodes || []).length],
    ['Entities', (data.entities || []).length],
    ['Components', (data.components || []).length],
    ['Scripts', (data.scripts || []).length],
    ['Themes', data.themes ? data.themes.themeNames.length : 0],
  ];
  stats.innerHTML = pairs.map(function(p) {
    return '<span class="stat"><span>' + p[0] + '</span> <span class="stat-val">' + p[1] + '</span></span>';
  }).join('');

  // ── Tree renderer ──────────────────────────────────────────────────────
  var treeEl = document.getElementById('tree');

  function isIRValue(obj) {
    return obj && typeof obj === 'object' && typeof obj.kind === 'string';
  }

  function kindTag(kind) {
    return '<span class="kind-tag kind-' + kind + '">' + kind + '</span>';
  }

  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function renderValue(val) {
    if (val === null || val === undefined) return '<span class="val-null">null</span>';
    if (typeof val === 'string') return '<span class="val-str">"' + escHtml(val) + '"</span>';
    if (typeof val === 'number') return '<span class="val-num">' + val + '</span>';
    if (typeof val === 'boolean') return '<span class="val-bool">' + val + '</span>';
    return '<span class="val">' + escHtml(JSON.stringify(val)) + '</span>';
  }

  function hasChildren(val) {
    if (!val || typeof val !== 'object') return false;
    if (Array.isArray(val)) return val.length > 0;
    return Object.keys(val).length > 0;
  }

  function childCount(val) {
    if (Array.isArray(val)) return val.length;
    if (val && typeof val === 'object') return Object.keys(val).length;
    return 0;
  }

  function buildNode(key, value, depth) {
    var wrap = document.createElement('div');
    wrap.className = 'node';

    var row = document.createElement('div');
    row.className = 'node-row';
    row.dataset.depth = depth;

    var isComplex = hasChildren(value) && typeof value === 'object';
    var irKind = isIRValue(value) ? value.kind : null;

    // Determine if expandable
    var expandable = false;
    if (irKind) {
      // IR nodes: expand if they have interesting children beyond 'kind'
      var irKeys = Object.keys(value).filter(function(k) { return k !== 'kind'; });
      expandable = irKeys.length > 0;
    } else if (isComplex) {
      expandable = true;
    }

    var toggle = document.createElement('span');
    toggle.className = 'toggle ' + (expandable ? 'collapsed' : 'leaf');
    row.appendChild(toggle);

    if (key !== null) {
      var keyEl = document.createElement('span');
      keyEl.className = 'key';
      keyEl.textContent = key;
      row.appendChild(keyEl);
    }

    // Show kind tag for IR nodes
    if (irKind) {
      row.insertAdjacentHTML('beforeend', kindTag(irKind));
    }

    // Inline value for simple types
    if (!expandable) {
      if (irKind === 'scalar') {
        row.insertAdjacentHTML('beforeend', renderValue(value.value));
      } else if (irKind === 'null') {
        row.insertAdjacentHTML('beforeend', '<span class="val-null">null</span>');
      } else if (irKind === 'secret') {
        row.insertAdjacentHTML('beforeend', renderValue(value.key));
      } else if (irKind === 'trigger_var') {
        row.insertAdjacentHTML('beforeend', renderValue(value.name));
      } else if (!isComplex && value !== null && value !== undefined) {
        row.insertAdjacentHTML('beforeend', renderValue(value));
      }
    } else {
      // Show child count
      var n = irKind === 'object' ? (value.entries || []).length
            : irKind === 'array' ? (value.items || []).length
            : childCount(value);
      if (n > 0) {
        row.insertAdjacentHTML('beforeend', '<span class="count">(' + n + ')</span>');
      }
    }

    wrap.appendChild(row);

    if (expandable) {
      var children = document.createElement('div');
      children.className = 'children hidden';

      if (irKind === 'object') {
        (value.entries || []).forEach(function(entry) {
          children.appendChild(buildNode(entry.key, entry.value, depth + 1));
        });
      } else if (irKind === 'array') {
        (value.items || []).forEach(function(item, i) {
          children.appendChild(buildNode('[' + i + ']', item, depth + 1));
        });
      } else if (irKind === 'reactive') {
        Object.keys(value).filter(function(k) { return k !== 'kind'; }).forEach(function(k) {
          children.appendChild(buildNode(k, value[k], depth + 1));
        });
      } else if (irKind === 'ref') {
        Object.keys(value).filter(function(k) { return k !== 'kind'; }).forEach(function(k) {
          children.appendChild(buildNode(k, value[k], depth + 1));
        });
      } else if (irKind === 'action') {
        Object.keys(value).filter(function(k) { return k !== 'kind'; }).forEach(function(k) {
          children.appendChild(buildNode(k, value[k], depth + 1));
        });
      } else if (Array.isArray(value)) {
        value.forEach(function(item, i) {
          children.appendChild(buildNode('[' + i + ']', item, depth + 1));
        });
      } else {
        Object.keys(value).forEach(function(k) {
          children.appendChild(buildNode(k, value[k], depth + 1));
        });
      }

      wrap.appendChild(children);

      toggle.addEventListener('click', function() {
        var isCollapsed = toggle.classList.contains('collapsed');
        toggle.className = 'toggle ' + (isCollapsed ? 'expanded' : 'collapsed');
        children.className = 'children' + (isCollapsed ? '' : ' hidden');
      });
    }

    return wrap;
  }

  // ── Build top-level sections ───────────────────────────────────────────
  function renderTree() {
    treeEl.innerHTML = '';

    // Sections
    if (data.sections && data.sections.length) {
      var sectionsWrap = buildNode('sections', data.sections, 0);
      // Replace the generic treatment: render each section with its key
      treeEl.appendChild(buildTopGroup('sections', 'section', data.sections, function(s) { return s.key; }, function(s) { return s.value; }));
    }

    ['bindings', 'reactiveNodes', 'entities', 'components', 'scripts'].forEach(function(field) {
      if (data[field] && data[field].length) {
        treeEl.appendChild(buildTopGroup(field, field === 'reactiveNodes' ? 'reactiveNode' : field.replace(/s$/, ''), data[field], null, null));
      }
    });

    if (data.themes) {
      treeEl.appendChild(buildNode('themes', data.themes, 0));
    }
  }

  function buildTopGroup(label, kindClass, items, keyFn, valFn) {
    var wrap = document.createElement('div');
    wrap.className = 'node';
    var row = document.createElement('div');
    row.className = 'node-row';

    var toggle = document.createElement('span');
    toggle.className = 'toggle collapsed';
    row.appendChild(toggle);

    var keyEl = document.createElement('span');
    keyEl.className = 'key';
    keyEl.textContent = label;
    row.appendChild(keyEl);

    row.insertAdjacentHTML('beforeend', '<span class="count">(' + items.length + ')</span>');
    wrap.appendChild(row);

    var children = document.createElement('div');
    children.className = 'children hidden';

    items.forEach(function(item, i) {
      var k = keyFn ? keyFn(item) : '[' + i + ']';
      var v = valFn ? valFn(item) : item;
      children.appendChild(buildNode(k, v, 1));
    });

    wrap.appendChild(children);

    toggle.addEventListener('click', function() {
      var isCollapsed = toggle.classList.contains('collapsed');
      toggle.className = 'toggle ' + (isCollapsed ? 'expanded' : 'collapsed');
      children.className = 'children' + (isCollapsed ? '' : ' hidden');
    });

    return wrap;
  }

  renderTree();

  // ── Search ─────────────────────────────────────────────────────────────
  var searchInput = document.getElementById('search');
  var debounceTimer;
  searchInput.addEventListener('input', function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(applySearch, 200);
  });

  function applySearch() {
    var query = searchInput.value.trim().toLowerCase();
    var rows = treeEl.querySelectorAll('.node-row');
    if (!query) {
      rows.forEach(function(r) { r.classList.remove('match'); });
      return;
    }
    rows.forEach(function(r) {
      var text = r.textContent.toLowerCase();
      r.classList.toggle('match', text.indexOf(query) !== -1);
      // expand parent nodes to show matches
      if (text.indexOf(query) !== -1) {
        var el = r.parentElement;
        while (el && el !== treeEl) {
          if (el.classList.contains('children') && el.classList.contains('hidden')) {
            el.classList.remove('hidden');
            var t = el.previousElementSibling && el.previousElementSibling.querySelector('.toggle');
            if (t) { t.className = 'toggle expanded'; }
          }
          el = el.parentElement;
        }
      }
    });
  }

  // ── Expand / Collapse All ──────────────────────────────────────────────
  window.expandAll = function() {
    treeEl.querySelectorAll('.toggle.collapsed').forEach(function(t) {
      t.className = 'toggle expanded';
      var ch = t.closest('.node').querySelector('.children');
      if (ch) ch.classList.remove('hidden');
    });
  };
  window.collapseAll = function() {
    treeEl.querySelectorAll('.toggle.expanded').forEach(function(t) {
      // Don't collapse root-level nodes
      var depth = t.parentElement.dataset.depth;
      if (depth === '0') return;
      t.className = 'toggle collapsed';
      var ch = t.closest('.node').querySelector(':scope > .children');
      if (ch) ch.classList.add('hidden');
    });
  };
})();
