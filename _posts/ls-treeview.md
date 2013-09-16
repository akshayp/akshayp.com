{{{"title" : "Ls Treeview","link" : "/ls-treeview/","category" : "Technology","id" : "1480","date" : "2010-12-28 03:02:27"}}}
On Unix based operating systems if you would like see a treeview of your directory structure, try running the following command in your fav shell

<code data-language="shell">
ls -R | grep ":$" | sed -e 's/:$//' -e 's/[^-][^\/]*\//–/g' -e 's/^/ /' -e 's/-/|/'
</code>