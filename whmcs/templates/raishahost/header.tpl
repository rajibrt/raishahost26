{* RaishaHost header: same navigation as raishahost.com, then the WHMCS page frame (sidebar + content). *}
{assign var=rhSite value="https://raishahost.com"}
{assign var=rhHome value=($templatefile == 'homepage')}
<!doctype html>
<html lang="en">
<head>
    <meta charset="{$charset}" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>{if $kbarticle.title}{$kbarticle.title} - {/if}{$pagetitle} - RaishaHost</title>
    {if $rhHome}<meta name="description" content="Order cPanel hosting, VPS servers and domains from RaishaHost, in business since 2008. Prices in Taka and US dollars, free SSL and a 30-day money-back guarantee.">{/if}
    {include file="$template/includes/head.tpl"}
    {$headoutput}
</head>
<body data-phone-cc-input="{$phoneNumberInputStyle}" class="rh{if $rhHome} rh-home{/if}{if $loggedin} rh-in{/if}">
    {if $captcha}{$captcha->getMarkup()}{/if}
    {$headeroutput}
    <a class="rh-skip" href="#main-body">Skip to content</a>

    <header id="header" class="header rh-header">
        {if $loggedin}
            <div class="topbar">
                <div class="container">
                    <div class="d-flex align-items-center">
                        <div class="mr-auto">
                            <button type="button" class="btn" data-toggle="popover" id="accountNotifications" data-placement="bottom">
                                <i class="far fa-flag"></i>
                                {if count($clientAlerts) > 0}
                                    {count($clientAlerts)}
                                    <span class="d-none d-sm-inline">{lang key='notifications'}</span>
                                {else}
                                    <span class="d-sm-none">0</span>
                                    <span class="d-none d-sm-inline">{lang key='nonotifications'}</span>
                                {/if}
                            </button>
                            <div id="accountNotificationsContent" class="w-hidden">
                                <ul class="client-alerts">
                                {foreach $clientAlerts as $alert}
                                    <li>
                                        <a href="{$alert->getLink()}">
                                            <i class="fas fa-fw fa-{if $alert->getSeverity() == 'danger'}exclamation-circle{elseif $alert->getSeverity() == 'warning'}exclamation-triangle{elseif $alert->getSeverity() == 'info'}info-circle{else}check-circle{/if}"></i>
                                            <div class="message">{$alert->getMessage()}</div>
                                        </a>
                                    </li>
                                {foreachelse}
                                    <li class="none">
                                        {lang key='notificationsnone'}
                                    </li>
                                {/foreach}
                                </ul>
                            </div>
                        </div>

                        <div class="ml-auto">
                            <div class="input-group active-client" role="group">
                                <div class="input-group-prepend d-none d-md-inline">
                                    <span class="input-group-text">{lang key='loggedInAs'}:</span>
                                </div>
                                <div class="btn-group">
                                    <a href="{$WEB_ROOT}/clientarea.php?action=details" class="btn btn-active-client">
                                        <span>{if $client.companyname}{$client.companyname}{else}{$client.fullName}{/if}</span>
                                    </a>
                                    <a href="{routePath('user-accounts')}" class="btn" data-toggle="tooltip" data-placement="bottom" title="Switch Account">
                                        <i class="fad fa-random"></i>
                                    </a>
                                    {if $adminMasqueradingAsClient || $adminLoggedIn}
                                        <a href="{$WEB_ROOT}/logout.php?returntoadmin=1" class="btn btn-return-to-admin" data-toggle="tooltip" data-placement="bottom" title="{if $adminMasqueradingAsClient}{lang key='adminmasqueradingasclient'} {lang key='logoutandreturntoadminarea'}{else}{lang key='adminloggedin'} {lang key='returntoadminarea'}{/if}">
                                            <i class="fas fa-redo-alt"></i>
                                            <span class="d-none d-md-inline-block">{lang key="admin.returnToAdmin"}</span>
                                        </a>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/if}

        <nav class="navbar navbar-expand-xl rh-nav" aria-label="Main">
            <div class="container">
                <a class="rh-logo" href="{$WEB_ROOT}/index.php" aria-label="RaishaHost home">
                    <img class="rh-logo-l" src="{$WEB_ROOT}/templates/raishahost/img/raishahost-logo.svg" alt="RaishaHost" width="176" height="23">
                    <img class="rh-logo-d" src="{$WEB_ROOT}/templates/raishahost/img/raishahost-logo-on-dark.svg" alt="" width="176" height="23" aria-hidden="true">
                </a>

                <div class="collapse navbar-collapse rh-drawer-panel" id="mainNavbar" aria-label="Menu">
                    {* phone/tablet drawer head; hidden on desktop *}
                    <div class="rh-dr-head">
                        <a href="{$WEB_ROOT}/index.php" class="rh-logo" aria-label="RaishaHost home">
                            <img class="rh-logo-l" src="{$WEB_ROOT}/templates/raishahost/img/raishahost-logo.svg" alt="RaishaHost" width="140" height="18">
                            <img class="rh-logo-d" src="{$WEB_ROOT}/templates/raishahost/img/raishahost-logo-on-dark.svg" alt="" width="140" height="18" aria-hidden="true">
                        </a>
                        <button type="button" class="rh-dr-close" data-rh-drawer-close aria-label="Close menu"><span></span><span></span></button>
                    </div>
                    {* Not id="nav": Nexus runs autoCollapse("#nav", 30) which loops forever on a menu taller than 30px. *}
                    <ul id="rhMenu" class="navbar-nav rh-menu">
                        {if $loggedin}
                            {include file="$template/includes/navbar.tpl" navbar=$primaryNavbar}
                        {else}
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hosting</a>
                                <ul class="dropdown-menu rh-drop">
                                    <li><a class="dropdown-item" href="{$WEB_ROOT}/store/linux-shared-hosting">cPanel Hosting<small>Billed yearly</small></a></li>
                                    <li><a class="dropdown-item" href="{$WEB_ROOT}/store/vps">VPS Servers<small>Billed monthly</small></a></li>
                                    <li><a class="dropdown-item" href="{$WEB_ROOT}/cart.php?a=add&domain=register">Register a Domain<small>.com, .com.bd and more</small></a></li>
                                    <li><a class="dropdown-item" href="{$WEB_ROOT}/cart.php?a=add&domain=transfer">Transfer a Domain<small>Move your domain to us</small></a></li>
                                    <li><a class="dropdown-item" href="{routePath('domain-pricing')}">Domain Prices<small>Every extension, every year</small></a></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Services</a>
                                <ul class="dropdown-menu rh-drop">
                                    <li><a class="dropdown-item" href="{$rhSite}/services">Web Design<small>Websites, apps and stores</small></a></li>
                                    <li><a class="dropdown-item" href="{$rhSite}/logo-design">Logo &amp; Graphic Design<small>Brand identity</small></a></li>
                                    <li><a class="dropdown-item" href="{$rhSite}/work">Our Work<small>Client websites we built</small></a></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Support</a>
                                <ul class="dropdown-menu rh-drop">
                                    <li><a class="dropdown-item" href="{$WEB_ROOT}/submitticket.php">Open a Ticket<small>We answer 24/7</small></a></li>
                                    <li><a class="dropdown-item" href="{routePath('knowledgebase-index')}">Knowledge Base<small>Guides and answers</small></a></li>
                                    <li><a class="dropdown-item" href="{routePath('announcement-index')}">Announcements<small>News from RaishaHost</small></a></li>
                                    <li><a class="dropdown-item" href="{$WEB_ROOT}/serverstatus.php">Network Status<small>Is everything running?</small></a></li>
                                    <li><a class="dropdown-item" href="{$WEB_ROOT}/contact.php">Contact Us<small>+880 1711-380679</small></a></li>
                                </ul>
                            </li>
                            <li class="nav-item"><a class="nav-link" href="{$rhSite}/about">About</a></li>
                        {/if}
                    </ul>

                    <ul class="navbar-nav rh-account rh-account-m">{* phone/tablet copy, inside the menu panel *}
                        {if $loggedin}
                            {include file="$template/includes/navbar.tpl" navbar=$secondaryNavbar rightDrop=true}
                        {else}
                            <li class="nav-item"><a class="btn rh-btn rh-btn-ghost" href="{$WEB_ROOT}/login.php">Log In</a></li>
                            <li class="nav-item"><a class="btn rh-btn rh-btn-pri" href="{$WEB_ROOT}/register.php">Create Account</a></li>
                        {/if}
                    </ul>
                </div>

                <div class="rh-tools">
                    {if !$loggedin && $currencies && count($currencies) > 1}
                        <div class="dropdown rh-curdrop">
                            <button type="button" class="rh-curbtn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="Currency: {$activeCurrency.code}">
                                <span class="sym">{if $activeCurrency.code == 'BDT'}৳{else}{$activeCurrency.prefix}{/if}</span><span class="code">{$activeCurrency.code}</span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right rh-drop">
                                {foreach $currencies as $c}
                                    <a class="dropdown-item{if $activeCurrency.id == $c.id} active{/if}" href="{$currentpagelinkback}currency={$c.id}"{if $activeCurrency.id == $c.id} aria-current="true"{/if}>
                                        {if $c.code == 'BDT'}৳ BDT<small>Bangladeshi Taka</small>{elseif $c.code == 'USD'}$ USD<small>US Dollar</small>{else}{$c.prefix} {$c.code}{/if}
                                    </a>
                                {/foreach}
                            </div>
                        </div>
                    {/if}
                    <button type="button" class="rh-mode" data-rh-mode-toggle aria-label="Switch to dark mode" title="Light / dark mode">
                        <i class="far fa-moon rh-i-moon" aria-hidden="true"></i>
                        <i class="far fa-sun rh-i-sun" aria-hidden="true"></i>
                    </button>
                    <a class="rh-cart" href="{$WEB_ROOT}/cart.php?a=view" aria-label="{lang key='carttitle'}">
                        <i class="far fa-shopping-cart"></i>
                        <span id="cartItemCount" class="rh-count{if !$cartitemcount} is-empty{/if}">{$cartitemcount}</span>
                    </a>
                    <span class="rh-sep" aria-hidden="true"></span>
                    <ul class="navbar-nav rh-account rh-account-d">{* desktop copy, beside the icons *}
                        {if $loggedin}
                            {include file="$template/includes/navbar.tpl" navbar=$secondaryNavbar rightDrop=true}
                        {else}
                            <li class="nav-item"><a class="btn rh-btn rh-btn-text" href="{$WEB_ROOT}/login.php">Log In</a></li>
                            <li class="nav-item"><a class="btn rh-btn rh-btn-pri" href="{$WEB_ROOT}/register.php">Create Account</a></li>
                        {/if}
                    </ul>
                    <button class="rh-burger" type="button" data-rh-drawer aria-controls="mainNavbar" aria-expanded="false" aria-label="Open menu">
                        <span class="bars"><i></i><i></i><i></i></span>
                        <span class="lbl">Menu</span>
                    </button>
                </div>
            </div>
        </nav>
        <div class="rh-veil" data-rh-drawer-close aria-hidden="true"></div>
    </header>

    {include file="$template/includes/network-issues-notifications.tpl"}

    {if !$rhHome}
        <nav class="master-breadcrumb" aria-label="breadcrumb">
            <div class="container">
                {include file="$template/includes/breadcrumb.tpl"}
            </div>
        </nav>
    {/if}

    {include file="$template/includes/validateuser.tpl"}
    {include file="$template/includes/verifyemail.tpl"}

    {if $rhHome}
        {include file="$template/includes/rh-hero.tpl"}
    {/if}

    <section id="main-body">
        <div class="{if !$skipMainBodyContainer && !$rhHome}container{/if}">
            <div class="{if $rhHome}rh-home-body{else}row{/if}">

            {if !$rhHome && !$inShoppingCart && ($primarySidebar->hasChildren() || $secondarySidebar->hasChildren())}
                <div class="col-lg-4 col-xl-3">
                    <div class="sidebar">
                        {include file="$template/includes/sidebar.tpl" sidebar=$primarySidebar}
                    </div>
                    {if !$inShoppingCart && $secondarySidebar->hasChildren()}
                        <div class="d-none d-lg-block sidebar">
                            {include file="$template/includes/sidebar.tpl" sidebar=$secondarySidebar}
                        </div>
                    {/if}
                </div>
            {/if}
            <div class="{if $rhHome}rh-home-main{elseif !$inShoppingCart && ($primarySidebar->hasChildren() || $secondarySidebar->hasChildren())}col-lg-8 col-xl-9{else}col-12{/if} primary-content">
