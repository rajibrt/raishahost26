{* One plan card. Needs $pid (WHMCS product id), $plan (words from rh-plans.tpl), $per (year or month), $rhBdt. *}
{assign var=prod value=\WHMCS\Product\Product::find($pid)}
{if $prod && !$prod->hidden && $prod->pricing()->first()}
    {assign var=price value=$prod->pricing()->first()->price()->toPrefixed()|replace:'.00':''}
    <article class="rh-plan{if $plan.pop} pop{/if}">
        <div class="top">
            <h3>{$plan.name}</h3>
            {if $plan.pop}<span class="rh-pill">Most popular</span>{/if}
        </div>
        {if $plan.tag}<p class="tag">{$plan.tag}</p>{/if}
        <div class="rh-price">
            <b>{$price}</b>
            {if $rhBdt && $plan.was}<s>{$plan.was}</s>{/if}
            <span>/ {$per}</span>
        </div>
        <ul class="rh-specs">
            {foreach $plan.specs as $s}
                <li><span>{$s[0]}</span><b>{$s[1]}</b></li>
            {/foreach}
        </ul>
        <a class="rh-btn {if $plan.pop}rh-btn-pri{else}rh-btn-ghost{/if}" href="{$WEB_ROOT}/cart.php?a=add&pid={$pid}">Order {$plan.name}</a>
    </article>
{/if}
