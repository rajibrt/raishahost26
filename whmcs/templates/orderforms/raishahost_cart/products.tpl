{* RaishaHost store page: plan cards like raishahost.com. Words and specs for our plans come from
   the client theme's includes/rh-plans.tpl (built from src/data/plans.ts); other products use WHMCS's own features. *}
{include file="orderforms/raishahost_cart/common.tpl"}
{include file="$template/includes/rh-plans.tpl"}
{assign var=rhWords value=$rhShared + $rhVps}
{assign var=rhBdt value=($activeCurrency.code == 'BDT')}

<div id="order-standard_cart" class="rh-store">
    <div class="row">
        <div class="cart-sidebar sidebar">
            {include file="orderforms/standard_cart/sidebar-categories.tpl"}
        </div>
        <div class="cart-body">

            <div class="rh-store-head">
                <div>
                    {if $productGroup.name == 'VPS'}
                        <p class="rh-k">VPS servers &middot; billed monthly</p>
                    {elseif $productGroup.name == 'Linux Shared Hosting'}
                        <p class="rh-k">cPanel hosting &middot; billed yearly</p>
                    {/if}
                    <h1>{if $productGroup.headline}{$productGroup.headline}{else}{$productGroup.name}{/if}</h1>
                    {if $productGroup.tagline}<p class="rh-store-tag">{$productGroup.tagline}</p>{/if}
                </div>
                {if !$loggedin && $currencies && count($currencies) > 1}
                    <div class="rh-cur" role="group" aria-label="Currency">
                        {foreach $currencies as $c}
                            <a href="?currency={$c.id}" class="{if $activeCurrency.id == $c.id}on{/if}">{if $c.code == 'BDT'}৳ BDT{else}{$c.prefix} {$c.code}{/if}</a>
                        {/foreach}
                    </div>
                {/if}
            </div>

            {if $errormessage}
                <div class="alert alert-danger">{$errormessage}</div>
            {elseif !$productGroup}
                <div class="alert alert-info">{lang key='orderForm.selectCategory'}</div>
            {/if}

            {include file="orderforms/standard_cart/sidebar-categories-collapsed.tpl"}

            <div class="products rh-plans" id="products">
                {foreach $products as $key => $product}
                    {$idPrefix = ($product.bid) ? ("bundle"|cat:$product.bid) : ("product"|cat:$product.pid)}
                    {assign var=w value=null}
                    {if !$product.bid && isset($rhWords[$product.pid])}{assign var=w value=$rhWords[$product.pid]}{/if}
                    <article class="product rh-plan{if $w && $w.pop} pop{/if}" id="{$idPrefix}">
                        <div class="top">
                            <h3 id="{$idPrefix}-name">{$product.name}</h3>
                            {if $w && $w.pop}<span class="rh-pill">Most popular</span>{/if}
                            {if $product.stockControlEnabled}<span class="rh-pill">{$product.qty} {$LANG.orderavailable}</span>{/if}
                        </div>
                        {if $w && $w.tag}<p class="tag">{$w.tag}</p>{/if}

                        <div class="rh-price" id="{$idPrefix}-price">
                            {if $product.bid}
                                <span>{$LANG.bundledeal}</span>
                                {if $product.displayprice}<b>{$product.displayprice}</b>{/if}
                            {else}
                                {if $product.pricing.hasconfigoptions}<span>{$LANG.startingfrom}</span>{/if}
                                <b>{$product.pricing.minprice.price|replace:' USD':''|replace:'USD':''|replace:'.00':''}</b>
                                {if $rhBdt && $w && $w.was}<s>{$w.was}</s>{/if}
                                <span>/
                                    {if $product.pricing.minprice.cycle eq "monthly"}month
                                    {elseif $product.pricing.minprice.cycle eq "quarterly"}3 months
                                    {elseif $product.pricing.minprice.cycle eq "semiannually"}6 months
                                    {elseif $product.pricing.minprice.cycle eq "annually"}year
                                    {elseif $product.pricing.minprice.cycle eq "biennially"}2 years
                                    {elseif $product.pricing.minprice.cycle eq "triennially"}3 years
                                    {else}{$product.pricing.minprice.cycle}{/if}
                                </span>
                                {if $product.pricing.minprice.setupFee}
                                    <small class="rh-setup">+ {$product.pricing.minprice.setupFee->toPrefixed()} {$LANG.ordersetupfee}</small>
                                {/if}
                            {/if}
                        </div>

                        {if $w}
                            <ul class="rh-specs">
                                {foreach $w.specs as $s}<li><span>{$s[0]}</span><b>{$s[1]}</b></li>{/foreach}
                            </ul>
                        {else}
                            {if $product.featuresdesc}<p class="rh-desc" id="{$idPrefix}-description">{$product.featuresdesc}</p>{/if}
                            {if $product.features}
                                <ul class="rh-specs">
                                    {foreach $product.features as $feature => $value}
                                        <li id="{$idPrefix}-feature{$value@iteration}"><span>{$feature}</span><b>{$value}</b></li>
                                    {/foreach}
                                </ul>
                            {/if}
                        {/if}

                        <a href="{$product.productUrl}" class="rh-btn {if $w && $w.pop}rh-btn-pri{else}rh-btn-ghost{/if} btn-order-now" id="{$idPrefix}-order-button"{if $product.hasRecommendations} data-has-recommendations="1"{/if}>
                            {$LANG.ordernowbutton}
                        </a>
                    </article>
                {/foreach}
            </div>

            {if $productGroup.name == 'VPS'}
                <ul class="rh-common">{foreach $rhVpsCommon as $f}<li><i class="fas fa-check"></i> {$f}</li>{/foreach}</ul>
            {elseif $productGroup.name == 'Linux Shared Hosting'}
                <ul class="rh-common">{foreach $rhSharedCommon as $f}<li><i class="fas fa-check"></i> {$f}</li>{/foreach}</ul>
            {/if}
        </div>
    </div>
</div>

{include file="orderforms/standard_cart/recommendations-modal.tpl"}
