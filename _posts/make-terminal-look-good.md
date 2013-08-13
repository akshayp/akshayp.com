{{{"title" : "Make Terminal look good","link" : "/make-terminal-look-good/","category" : "Technology","id" : "1678","date" : "2011-09-17 05:32:55"}}}
The IR theme is one of the cleanest themes out there for terminal. Grab it from Todd's detailed blog linked below. I also use some of the colors from the theme to pretty up the shell a bit and make it look like:

![Terminal Window](http://img.skitch.com/20111017-jdqcdfnp7mymbta83423x6wp2.png)

**Put these settings in your .bashrc or .bash_profile**

<pre class="prettyprint lang-bash linenums">
export COLOR_NC='\033[0m' # No Color
export COLOR_WHITE='\033[1;37m'
export COLOR_BLACK='\033[0;30m'
export COLOR_BLUE='\033[0;34m'
export COLOR_LIGHT_BLUE='\033[1;34m'
export COLOR_GREEN='\033[0;32m'
export COLOR_LIGHT_GREEN='\033[1;32m'
export COLOR_CYAN='\033[0;36m'
export COLOR_LIGHT_CYAN='\033[1;36m'
export COLOR_RED='\033[0;31m'
export COLOR_LIGHT_RED='\033[1;31m'
export COLOR_PURPLE='\033[0;35m'
export COLOR_LIGHT_PURPLE='\033[1;35m'
export COLOR_BROWN='\033[0;33m'
export COLOR_YELLOW='\033[1;33m'
export COLOR_GRAY='\033[1;30m'
export COLOR_LIGHT_GRAY='\033[0;37m'
</pre>

**Specify your shell to display time and current folder with home abbreviated as ~**

<pre class="prettyprint lang-bash linenums">
export PS1="[\[${COLOR_LIGHT_RED}\]\T\[${COLOR_NC}\]][ \[${COLOR_LIGHT_BLUE}\]\w \[${COLOR_NC}\]] \[${COLOR_PURPLE}\]&gt; \[${COLOR_NC}\]"</pre>

[via Todd Werth](http://blog.toddwerth.com/entries/13)