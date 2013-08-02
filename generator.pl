#!/usr/bin/perl
#
# generator.pl
# dynamic generation of website pages using templates
#

use strict;

use lib 'lib';

use HTML::Entities;
use HTML::Template;

#use feed;

# Defaults
my $cLanguage = $ARGV[0] || 'it';
my $cTmplPath = 'tmpl/'.$cLanguage;
my $cHtmlPath = 'html/'.$cLanguage;

# Website structure
 my @aWebsite = (
   { page => 'home', title => { it => 'Presentazione', en => 'Presentation' } },
   { page => 'choir', title => { it => 'il Coro', en => 'the Choir' } },
   { page => 'repertory', title => { it => 'il Repertorio', en => 'the Repertory' } },
   { page => 'paola_gasparutti', title => { it => 'Paola Gasparutti', en => 'Paola Gasparutti' } },
   { page => 'giuseppe_schiff', title => { it => 'Giuseppe Schiff', en => 'Giuseppe Schiff' } },
   { page => 'beppino_delle_vedove', title => { it => 'Beppino Delle Vedove', en => 'Beppino delle Vedove' } },
   { page => 'publications', title => { it => 'le Pubblicazioni', en => 'the Publications' } },
   { page => 'events', title => { it => 'Eventi', en => 'Events' } },
   { page => 'logo', title => { it => 'Logo', en => 'Logo' } },
   { page => 'contacts', title => { it => 'Contatti', en => 'Contacts' } },
   { page => 'officers', title => { it => 'Cariche sociali', en => 'Officers' } },
   { page => 'about', title => { it => 'Informazioni', en => 'Informations' } },
##  { page => 'mailinglist', title => { it => 'Mailing list', en => 'Mailing list' } },
);

# Get next event (show in all pages)
my $cNextEvent;

#my $rItems = feed::getItems( feed::parse( "rss/$cLanguage/harmonia.rss" ) );
#if( ref $rItems eq 'ARRAY' )
#{
#    my $nIndex = 0;
#    $cNextEvent =
#        sprintf( '<a href="events.html%s"><b><i>%s</i></b> - %s</a>',
#            map { encode_entities( $_ ) } ( substr( $rItems->[$nIndex]->{'link'}, index( $rItems->[$nIndex]->{'link'}, '#' ) ),
#                                            substr( $rItems->[$nIndex]->{'title'}, 0, 10 ), substr( $rItems->[$nIndex]->{'title'}, 13 ) )
#        );
#}

my @aLocaltime = localtime();

# Cicle structure and generate pages from templates
foreach my $rPage ( @aWebsite )
{
    my $cTemplate = $rPage->{'template'} || 'base';
    $cTemplate .= '.tmpl';

    my $oTmpl = HTML::Template->new( filename => $cTemplate, path => [ $cTmplPath ], debug => 1 );#, search_path_on_include => 0 );

    if( open( HTML, "> $cHtmlPath/$rPage->{'page'}.html" ) )
    {
        $oTmpl->param( title => $rPage->{'title'}->{$cLanguage},
                       file => $rPage->{'page'} . '.html',
                       next_event => $cNextEvent,
                       content => getContent( $rPage->{'page'} ),
                       year => $aLocaltime[5] + 1900,
        );

        print HTML $oTmpl->output();
        close HTML;
    }
    else
    {
        print "Troubles!";
    }
}

sub getContent
{
    my $cPage = shift;

    my $cContent;

    if( open CONTENT, "$cTmplPath/$cPage.tmpl" )
    {
        $cContent = join( '', <CONTENT> );

        close CONTENT;
    }

    return $cContent;
}
